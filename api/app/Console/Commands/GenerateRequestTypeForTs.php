<?php

namespace App\Console\Commands;

use App\Console\Commands\ValueObjects\ReplaceValueObject;
use App\Http\Requests\Admin\AdminPutStorageRequest;
use App\Http\Requests\Admin\AdminUser\UpdateAdminUserRequest;
use App\Http\Requests\Admin\Auth\ForgotPasswordAdminRequest;
use App\Http\Requests\Admin\Auth\LoginAdminFormRequest;
use App\Http\Requests\Admin\Auth\RegisterAdminFormRequest;
use App\Http\Requests\Admin\Auth\ResetPasswordAdminRequest;
use App\Http\Requests\Admin\Auth\VerificationConfirmRequest;
use App\Http\Requests\Admin\Auth\VerificationResendAdminUserFormRequest;
use App\Http\Requests\Admin\Circle\CreateCircleFormRequest;
use App\Http\Requests\Admin\Circle\UpdateCircleFormRequest;
use App\Http\Requests\Admin\CircleNewJoy\RegisterCircleNewJoyRequest;
use App\Http\Requests\Admin\CircleNewJoy\UpdateCircleNewJoyRequest;
use App\Http\Requests\Admin\CircleUser\RegisterCircleUserRequest;
use App\Http\Requests\Admin\CircleUser\UpdateCircleUserRequest;
use App\Http\Requests\Admin\CircleUser\VerificationEmailCircleUserRequest;
use App\Http\Requests\Circle\Auth\VerificationResendCircleUserFormRequest;
use Illuminate\Console\Command;
use ReflectionClass;

class GenerateRequestTypeForTs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:request';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Form Requestからtypescriptのtypeを生成する';

    /**
     * @var string[]
     */
    private array $requestClasses = [];

    private string $stubDataForMain;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->init();
        $this->requestClasses = [
            LoginAdminFormRequest::class,
            RegisterAdminFormRequest::class,
            RegisterCircleNewJoyRequest::class,
            RegisterCircleUserRequest::class,
            UpdateCircleNewJoyRequest::class,
            CreateCircleFormRequest::class,
            UpdateCircleFormRequest::class,
            VerificationEmailCircleUserRequest::class,
            VerificationResendAdminUserFormRequest::class,
            VerificationResendCircleUserFormRequest::class,
            VerificationConfirmRequest::class,
            AdminPutStorageRequest::class,
            UpdateCircleUserRequest::class,
            UpdateAdminUserRequest::class,
            ForgotPasswordAdminRequest::class,
            ResetPasswordAdminRequest::class,
        ];
    }

    private function init()
    {
        /** stubの取得 */
        $this->stubDataForMain = file_get_contents($this->getStubPath());
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach ($this->requestClasses as $requestClass) {
            $this->generateRequestUsecase($requestClass);
        }
    }

    private function generateRequestUsecase(string $class)
    {
        $reflectionClass = new ReflectionClass($class);
        $className = $reflectionClass->getShortName();

        $requestBodyObject = '';
        $validationObject = '';

        $ruleFunction = $reflectionClass->getMethod('rules');
        /**
         * rule関数の実行
         * @var array{(string|array)} $rulesData
         */
        $rulesData = $ruleFunction->invoke($reflectionClass->newInstance());
        $rulesDataWithOutAsterisk = array_filter(
            $rulesData,
            fn (string $ruleKey) => !preg_match('/\*/', $ruleKey),
            ARRAY_FILTER_USE_KEY
        );


        foreach ($rulesDataWithOutAsterisk as $key => $value) {
            /** @var array $arrVal */
            $arrVal = is_string($value)
                ? explode('|', str_replace(' ', '', $value))
                : $value;

            $type = $this->getTsType($arrVal);
            if ($type === 'any[]' && in_array("{$key}.*", array_keys($rulesData, true), true)) {
                $arrChildVal = $rulesData["{$key}.*"];
                $arrChildVal = is_string($arrChildVal)
                    ? explode('|', str_replace(' ', '', $arrChildVal))
                    : $arrChildVal;
                $type = $this->getTsType($arrChildVal);

                if (preg_match('/\|/', $type)) {
                    $type = "({$type})";
                }

                if ($type !== 'any[]') {
                    $type .= '[]';
                }
            }

            $operator = in_array('nullable', $arrVal) ? '?:' : ':';

            $requestBodyObject .= "    {$key}{$operator} {$type}\n";
            $validationObject .= "        {$key}?: string[]\n";
        }
        $requestBodyObject = substr($requestBodyObject, 0, -1);
        $validationObject = substr($validationObject, 0, -1);

        /**
         * stubの置き換え
         *
         * Classのコメントと名前を置き換え
         * 定数をkeyとvalueにする
         */
        $writableData = $this->replaceTogether(
            [
                new ReplaceValueObject('{{ $className }}', $className),
                new ReplaceValueObject('{{ $requestBodyObject }}', $requestBodyObject),
                new ReplaceValueObject('{{ $validationObject }}', $validationObject),
            ],
            $this->stubDataForMain
        );

        /**
         * ファイルへの書き込み
         */
        file_put_contents(
            $this->getOutputTsPath().'/'.$className.'.ts',
            $writableData
        );
    }

    /**
     * まとめて置き換える
     *
     * @param ReplaceValueObject[] $replaceValueObjects
     * @param string $data
     * @return string
     */
    private function replaceTogether(array $replaceValueObjects, string $data): string
    {
        $_data = $data;
        foreach ($replaceValueObjects as $replaceValueObject) {
            $_data = str_replace(
                $replaceValueObject->search,
                $replaceValueObject->replace,
                $_data
            );
        }

        return $_data;
    }

    private function getStubPath(): string
    {
        return app_path('Console/Commands/stubs/request_body_type.ts.stub');
    }

    private function getOutputTsPath(): string
    {
        return base_path('../admin/lib/types/api');
    }

    private function getTsType(array $ruleData): string
    {
        foreach ($ruleData as $value) {
            if (
                $value === 'string' ||
                $value === 'ip' ||
                $value === 'ipv4' ||
                $value === 'ipv6' ||
                $value === 'uuid'
            ) {
                return 'string';
            }

            if ($value === 'boolean') {
                return 'boolean';
            }

            if (
                $value === 'file' ||
                $value === 'image'
            ) {
                return 'Blob|File';
            }

            if ($value === 'array') {
                return 'any[]';
            }

            if (
                $value === 'integer' ||
                $value === 'numeric' ||
                preg_match('/digits/', $value)
            ) {
                return 'number';
            }
        }

        return 'any';
    }
}
