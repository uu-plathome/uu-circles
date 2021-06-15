<?php

namespace App\Console\Commands;

use App\Usecases\Batch\UuYell\CopyUuYellPostsUsecase;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

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
     * @throws \Exception
     *
     * @return mixed
     */
    public function handle()
    {
        Log::debug('CopyUuYellPostsCommand handle start');

        $this->copyUuYellPostsUsecase->invoke();

        Log::debug('CopyUuYellPostsCommand handle end');
    }
}
