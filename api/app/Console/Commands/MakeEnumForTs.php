<?php

namespace App\Console\Commands;

use App\Console\Commands\ValueObjects\ReplaceValueObject;
use App\Enum\CircleType;
use App\Enum\DateOfActivity;
use App\Enum\PlaceOfActivity;
use App\Enum\CircleTagModel;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionClassConstant;

class MakeEnumForTs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:enum';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enumを生成する';

    /**
     * enum class一覧
     *
     * @var string[]
     */
    protected array $enumClasses;

    /**
     * Stubの格納
     */
    protected string $stubDataForMain;

    /**
     * Stubの格納
     */
    protected string $stubDataForTest;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->enumClasses = [
            CircleType::class,
            CircleTagModel::class,
            DateOfActivity::class,
            PlaceOfActivity::class,
        ];
        $this->init();
    }

    private function init()
    {
        /** stubの取得 */
        $this->stubDataForMain = file_get_contents($this->getStubPath());
        $this->stubDataForTest = file_get_contents($this->getStubTestPath());
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach ($this->enumClasses as $enumClass) {
            $this->createEnumJsUsecase($enumClass);
        }
    }

    private function createEnumJsUsecase(string $class)
    {
        $reflectionClass = new ReflectionClass($class);
        $className = $reflectionClass->getShortName();

        /**
         * key名よりオブジェクト値とis〇〇関数の作成
         */
        $keyValue = '';
        $keyValueGuardFunction = '';
        foreach ($reflectionClass->getConstants() as $key => $value) {
            $reflectionClassConstant = new ReflectionClassConstant($class, $key);
            $keyStudly = Str::studly(strtolower($key));

            /**
             * 定数のDoc Commentを取得
             */
            $constantDocComment = $reflectionClassConstant->getDocComment();
            if ($constantDocComment) {
                $keyValue .= "  {$constantDocComment}\n";

                // guard関数のためのコメント生成/整形
                $guardConstantDocComment = str_replace('    ', '', $constantDocComment);
                $keyValueGuardFunction .= "{$guardConstantDocComment}\n";
            }

            $keyValue .= "  {$key}: '{$value}',\n\n";
            $keyValueGuardFunction .= "export const is{$keyStudly} = (v: any): v is '{$value}' => v === {$className}.{$key}\n";
        }

        /** いらない改行、カンマの削除 */
        $keyValue = substr($keyValue, 0, -3);
        $keyValue = str_replace('    ', '  ', $keyValue);
        /** いらない改行の削除 */
        $keyValueGuardFunction = substr($keyValueGuardFunction, 0, -1);

        /**
         * stubの置き換え
         *
         * Classのコメントと名前を置き換え
         * 定数をkeyとvalueにする
         */
        $writableData = $this->replaceTogether(
            [
                new ReplaceValueObject('{{ $classComment }}', $reflectionClass->getDocComment() ?? ''),
                new ReplaceValueObject('{{ $className }}', $className),
                new ReplaceValueObject('{{ $keyValue }}', $keyValue),
                new ReplaceValueObject('{{ $keyValueGuardFunction }}', $keyValueGuardFunction),
            ],
            $this->stubDataForMain
        );

        /**
         * ファイルへの書き込み
         */
        $outputJsPathes = $this->getOutputJsPath();
        foreach ($outputJsPathes as $outputJsPath) {
            file_put_contents(
                $outputJsPath . '/' . $className . '.ts',
                $writableData
            );
        }

        // test生成
        $keyValueTest = '';
        foreach ($reflectionClass->getConstants() as $key => $value) {
            $keyStudly = Str::studly(strtolower($key));

            $keyValueTest .= "  it('is{$keyStudly}', () => {\n";
            $keyValueTest .= "    expect(TestFunc.{$className}.{$key}).toBe('{$value}')\n";
            $keyValueTest .= "    expect(TestFunc.is{$className}('{$value}')).toBeTruthy()\n";
            $keyValueTest .= "    expect(TestFunc.is{$keyStudly}('{$value}')).toBeTruthy()\n";
            $keyValueTest .= "    expect(TestFunc.is{$keyStudly}('aaaaabbbbcccc')).toBeFalsy()\n";
            $keyValueTest .= "  })\n";
        }
        $keyValueTest = substr($keyValueTest, 0, -1);

        /**
         * stubの置き換え
         *
         * Classのコメントと名前を置き換え
         * 定数をkeyとvalueにする
         */
        $writableData = $this->replaceTogether(
            [
                new ReplaceValueObject('{{ $className }}', $className),
                new ReplaceValueObject('{{ $test }}', $keyValueTest),
            ],
            $this->stubDataForTest
        );

        /**
         * ファイルへの書き込み
         */
        $outputJsTestPathes = $this->getOutputJsTestPath();
        foreach ($outputJsTestPathes as $outputJsTestPath) {
            file_put_contents(
                $outputJsTestPath . '/' . $className . '.spec.ts',
                $writableData
            );
        }
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
        return app_path('Console/Commands/stubs/enum.ts.stub');
    }

    private function getStubTestPath(): string
    {
        return app_path('Console/Commands/stubs/enum_test.ts.stub');
    }

    /**
     * @return string[]
     */
    private function getOutputJsPath(): array
    {
        return [
            base_path('../admin/lib/enum/api'),
            base_path('../circle/lib/enum/api'),
            base_path('../main/lib/enum/api'),
        ];
    }

    /**
     * @return string[]
     */
    private function getOutputJsTestPath(): array
    {
        return [
            base_path('../admin/__tests__/lib/enum/api'),
            base_path('../circle/__tests__/lib/enum/api'),
            base_path('../main/__tests__/lib/enum/api'),
        ];
    }
}
