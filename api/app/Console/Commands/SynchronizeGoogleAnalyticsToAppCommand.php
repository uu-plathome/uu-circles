<?php

namespace App\Console\Commands;

use App\UseCases\Batch\PageView\ReplicateCirclePageViewUsecase;
use App\UseCases\Batch\PageView\ReplicateTagPageViewUsecase;
use App\UseCases\Batch\PageView\SynchronizeGoogleAnalyticsToAppUsecase;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SynchronizeGoogleAnalyticsToAppCommand extends Command
{
    const SIGNATURE = 'synchronize:google-analytics';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = self::SIGNATURE;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Google AnalyticsのデータをDBにコピーする';

    private ReplicateCirclePageViewUsecase $replicateCirclePageViewUsecase;

    private ReplicateTagPageViewUsecase $replicateTagPageViewUsecase;

    private SynchronizeGoogleAnalyticsToAppUsecase $synchronizeGoogleAnalyticsToAppUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(
        ReplicateCirclePageViewUsecase $replicateCirclePageViewUsecase,
        ReplicateTagPageViewUsecase $replicateTagPageViewUsecase,
        SynchronizeGoogleAnalyticsToAppUsecase $synchronizeGoogleAnalyticsToAppUsecase
    ) {
        parent::__construct();
        $this->replicateCirclePageViewUsecase = $replicateCirclePageViewUsecase;
        $this->replicateTagPageViewUsecase = $replicateTagPageViewUsecase;
        $this->synchronizeGoogleAnalyticsToAppUsecase = $synchronizeGoogleAnalyticsToAppUsecase;
    }

    /**
     * Execute the console command.
     *
     * @throws \Google\ApiCore\ApiException
     * @throws \Exception
     */
    public function handle()
    {
        Log::debug('SynchronizeGoogleAnalyticsToAppCommand start');
        $this->synchronizeGoogleAnalyticsToAppUsecase->invoke();
        $this->replicateCirclePageViewUsecase->invoke();
        $this->replicateTagPageViewUsecase->invoke();
        Log::debug('SynchronizeGoogleAnalyticsToAppCommand end');

        return 0;
    }
}
