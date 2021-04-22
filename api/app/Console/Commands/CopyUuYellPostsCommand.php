<?php

namespace App\Console\Commands;

use App\Usecases\Batch\UuYell\CopyUuYellPostsUsecase;
use Illuminate\Console\Command;

class CopyUuYellPostsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'copy:uu-yell';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'uu-yellの記事をコピーする';

    private CopyUuYellPostsUsecase $copyUuYellPostsUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(CopyUuYellPostsUsecase $copyUuYellPostsUsecase)
    {
        parent::__construct();
        $this->copyUuYellPostsUsecase = $copyUuYellPostsUsecase;
    }


    /**
     * Execute the console command.
     *
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        $this->copyUuYellPostsUsecase->invoke();
    }
}
