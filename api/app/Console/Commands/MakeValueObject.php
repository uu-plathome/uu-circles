<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand as Command;
use Illuminate\Filesystem\Filesystem;

class MakeValueObject extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'make:value';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Value object class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'ValueObjects';

    /**
     * Create a new command instance.
     *
     * @param Filesystem $files
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct($files);
    }

    /**
    * 生成に使うスタブファイルを取得する
    *
    * @return string
    */
    protected function getStub()
    {
        return app_path('Console/Commands/stubs/value_object.stub');
    }

    /**
     * クラスのデフォルトの名前空間を取得する
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\ValueObjects';
    }
}
