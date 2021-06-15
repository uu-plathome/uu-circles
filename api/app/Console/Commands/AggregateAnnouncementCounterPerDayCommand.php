<?php

namespace App\Console\Commands;

use App\Usecases\Batch\Announcement\AggregateAnnouncementCounterPerDayUsecase;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class AggregateAnnouncementCounterPerDayCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aggregate:announcement-counter';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '１日ごとのお知らせのクリック数の集計';

    private AggregateAnnouncementCounterPerDayUsecase $aggregateAnnouncementCounterPerDayUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(AggregateAnnouncementCounterPerDayUsecase $aggregateAnnouncementCounterPerDayUsecase)
    {
        parent::__construct();
        $this->aggregateAnnouncementCounterPerDayUsecase = $aggregateAnnouncementCounterPerDayUsecase;
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
        Log::debug('AggregateAnnouncementCounterPerDayCommand handle start');

        $this->aggregateAnnouncementCounterPerDayUsecase->invoke(
            Carbon::yesterday()
        );

        Log::debug('AggregateAnnouncementCounterPerDayCommand handle end');
    }
}
