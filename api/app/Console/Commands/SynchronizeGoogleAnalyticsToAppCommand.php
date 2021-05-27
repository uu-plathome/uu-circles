<?php

namespace App\Console\Commands;

use App\Usecases\Batch\PageView\SynchronizeGoogleAnalyticsToAppUsecase;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SynchronizeGoogleAnalyticsToAppCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'synchronize:google-analytics';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Google AnalyticsのデータをDBに入れる';
    
    private SynchronizeGoogleAnalyticsToAppUsecase $synchronizeGoogleAnalyticsToAppUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(SynchronizeGoogleAnalyticsToAppUsecase $synchronizeGoogleAnalyticsToAppUsecase)
    {
        parent::__construct();
        $this->synchronizeGoogleAnalyticsToAppUsecase = $synchronizeGoogleAnalyticsToAppUsecase;
    }

    /**
     * Execute the console command.
     *
     * @throws \Google\ApiCore\ApiException
     */
    public function handle()
    {
        Log::debug("SynchronizeGoogleAnalyticsToAppCommand start");
        $this->synchronizeGoogleAnalyticsToAppUsecase->invoke();
        Log::debug("SynchronizeGoogleAnalyticsToAppCommand end");
        return 0;
    }
}
