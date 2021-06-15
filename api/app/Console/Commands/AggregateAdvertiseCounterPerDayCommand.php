<?php

namespace App\Console\Commands;

use App\Usecases\Batch\Advertise\AggregateAdvertiseCounterPerDayUsecase;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class AggregateAdvertiseCounterPerDayCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aggregate:advertise-counter';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '１日ごとの広告のクリック数の集計';

    private AggregateAdvertiseCounterPerDayUsecase $aggregateAdvertiseCounterPerDayUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(AggregateAdvertiseCounterPerDayUsecase $aggregateAdvertiseCounterPerDayUsecase)
    {
        parent::__construct();
        $this->aggregateAdvertiseCounterPerDayUsecase = $aggregateAdvertiseCounterPerDayUsecase;
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
        Log::debug('AggregateAdvertiseCounterPerDayCommand handle start');

        $this->aggregateAdvertiseCounterPerDayUsecase->invoke(
            Carbon::yesterday()
        );

        Log::debug('AggregateAdvertiseCounterPerDayCommand handle end');
    }
}
