<?php

namespace App\Console\Commands;

use App\Console\Commands\ValueObjects\ReplaceValueObject;
use App\Http\Requests\Admin\AdminPutStorageRequest;
use App\Http\Requests\Admin\AdminUser\UpdateAdminUserRequest;
use App\Http\Requests\Admin\Advertise\CreateAdvertiseRequest;
use App\Http\Requests\Admin\Advertise\UpdateAdvertiseRequest;
use App\Http\Requests\Admin\Announcement;
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
use App\Http\Requests\Admin\CircleTag;
use App\Http\Requests\Admin\CircleUser;
use App\Http\Requests\Admin\DemoCircleNewJoy;
use App\Http\Requests\Circle\Auth\ForgotPasswordCircleRequest;
use App\Http\Requests\Circle\Auth\LoginCircleFormRequest;
use App\Http\Requests\Circle\Auth\RegisterCircleFormRequest;
use App\Http\Requests\Circle\Auth\ResetPasswordCircleRequest;
use App\Http\Requests\Circle\Auth\VerificationResendCircleUserFormRequest;
use App\Http\Requests\Circle\Circle\UpdateCircleFormRequest as CircleUpdateCircleFormRequest;
use App\Http\Requests\Circle\CircleNewJoy\RegisterCircleNewJoyRequest as CircleNewJoyRegisterCircleNewJoyRequest;
use App\Http\Requests\Circle\CircleNewJoy\UpdateCircleNewJoyRequest as CircleNewJoyUpdateCircleNewJoyRequest;
use App\Http\Requests\Circle\CirclePutStorageRequest;
use App\Http\Requests\Circle\CircleUser\ImportCircleUserRequest;
use App\Http\Requests\Circle\CircleUser\RegisterCircleUserRequest as CircleUserRegisterCircleUserRequest;
use App\Http\Requests\Circle\CircleUser\UpdateCircleUserRequest as CircleUserUpdateCircleUserRequest;
use App\Http\Requests\Circle\User\UpdateOwnUserRequest;
use App\Http\Requests\Main;
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
    private array $requestAdminClasses = [];
    /**
     * @var string[]
     */
    private array $requestCircleClasses = [];
    /**
     * @var string[]
     */
    private array $requestMainClasses = [];

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
        $this->requestAdminClasses = [
            LoginAdminFormRequest::class,
            RegisterAdminFormRequest::class,
            RegisterCircleNewJoyRequest::class,
            CircleUser\RegisterCircleUserRequest::class,
            UpdateCircleNewJoyRequest::class,
            CreateCircleFormRequest::class,
            UpdateCircleFormRequest::class,
            VerificationResendAdminUserFormRequest::class,
            VerificationConfirmRequest::class,
            AdminPutStorageRequest::class,
            CircleUser\UpdateCircleUserRequest::class,
            UpdateAdminUserRequest::class,
            ForgotPasswordAdminRequest::class,
            ResetPasswordAdminRequest::class,
            CreateAdvertiseRequest::class,
            UpdateAdvertiseRequest::class,
            CircleTag\CreateOrUpdateCircleTagRequest::class,
            Announcement\CreateAnnouncementRequest::class,
            Announcement\UpdateAnnouncementRequest::class,
            DemoCircleNewJoy\RegisterDemoCircleNewJoyRequest::class,
            DemoCircleNewJoy\UpdateDemoCircleNewJoyRequest::class,
        ];
        $this->requestCircleClasses = [
            ForgotPasswordCircleRequest::class,
            LoginCircleFormRequest::class,
            RegisterCircleFormRequest::class,
            ResetPasswordCircleRequest::class,
            CircleUser\VerificationEmailCircleUserRequest::class,
            VerificationResendCircleUserFormRequest::class,
            CirclePutStorageRequest::class,
            CircleUpdateCircleFormRequest::class,
            CircleNewJoyRegisterCircleNewJoyRequest::class,
            CircleNewJoyUpdateCircleNewJoyRequest::class,
            UpdateOwnUserRequest::class,
            CircleUserUpdateCircleUserRequest::class,
            CircleUserRegisterCircleUserRequest::class,
            ImportCircleUserRequest::class,
            \App\Http\Requests\Circle\CircleTag\CreateOrUpdateCircleTagRequest::class,
        ];
        $this->requestMainClasses = [
            Main\PagePosition\CreatePagePositionRequest::class,
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
        foreach ($this->requestMainClasses as $requestClass) {
            $this->generateRequestUsecase($requestClass, $this->getMainOutputTsPath());
        }
        foreach ($this->requestAdminClasses as $requestClass) {
            $this->generateRequestUsecase($requestClass, $this->getAdminOutputTsPath());
        }
        foreach ($this->requestCircleClasses as $requestClass) {
            $this->generateRequestUsecase($requestClass, $this->getCircleOutputTsPath());
        }
    }

    private function generateRequestUsecase(string $class, string $outputPath)
    {
        $reflectionClass = new ReflectionClass($class);
        $className = $reflectionClass->getShortName();

        $requestBodyObject = '';
        $validationObject = '';

        $ruleFunction = $reflectionClass->getMethod('rules');
        /**
         * rule関数の実行.
         *
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

            $requestBodyObject .= "  {$key}{$operator} {$type}\n";
            $validationObject .= "    {$key}?: string[]\n";
        }
        $requestBodyObject = substr($requestBodyObject, 0, -1);
        $validationObject = substr($validationObject, 0, -1);

        /**
         * stubの置き換え.
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
            $outputPath.'/'.$className.'.ts',
            $writableData
        );
    }

    /**
     * まとめて置き換える.
     *
     * @param ReplaceValueObject[] $replaceValueObjects
     * @param string               $data
     *
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

    private function getAdminOutputTsPath(): string
    {
        return base_path('../admin/lib/types/api');
    }

    private function getCircleOutputTsPath(): string
    {
        return base_path('../circle/lib/types/api');
    }

    private function getMainOutputTsPath(): string
    {
        return base_path('../main/src/lib/types/api');
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
                return 'Blob | File';
            }

            if ($value === 'array') {
                return 'any[]';
            }

            if (
                $value === 'integer' ||
                $value === 'numeric' ||
                preg_match('/digits/', $value) ||
                $value === 'regex:/^[0-9]+$/i'
            ) {
                return 'number';
            }
        }

        return 'any';
    }
}
