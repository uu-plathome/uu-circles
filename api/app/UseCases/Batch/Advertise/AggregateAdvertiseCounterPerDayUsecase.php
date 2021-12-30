<?php

declare(strict_types=1);

namespace App\UseCases\Batch\Advertise;

use App\Models\AdvertiseCounter;
use App\Models\AdvertiseCounterHistory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class AggregateAdvertiseCounterPerDayUsecase
{
    private Collection $aggregateAdvertises;

    /**
     * 指定された日として、広告のクリック数を集計する.
     *
     * @param Carbon $date
     */
    public function invoke(Carbon $date)
    {
        $formatDate = $date->format('Y-m-d');
        $now = Carbon::now();

        $this->aggregateAdvertises = new Collection([]);

        AdvertiseCounter::query()
            ->chunk(
                100,
                function ($advertiseCounters) use ($formatDate, $now) {
                    foreach ($advertiseCounters as $advertiseCounter) {
                        $oldAggregateAdvertiseKey = null;
                        $oldAggregateAdvertise = null;
                        foreach ($this->aggregateAdvertises->toArray() as $key => $aggregateAdvertise) {
                            if (
                                $aggregateAdvertise &&
                                $aggregateAdvertise['link'] === $advertiseCounter->link &&
                                $aggregateAdvertise['advertise_id'] === $advertiseCounter->advertise_id
                            ) {
                                $oldAggregateAdvertise = $aggregateAdvertise;
                                $oldAggregateAdvertiseKey = $key;
                                break;
                            }
                        }

                        if (is_null($oldAggregateAdvertiseKey)) {
                            $this->aggregateAdvertises = $this->aggregateAdvertises->merge([
                                [
                                    'link'         => $advertiseCounter->link,
                                    'advertise_id' => $advertiseCounter->advertise_id,
                                    'date'         => $formatDate,
                                    'count'        => $advertiseCounter->count,
                                    'created_at'   => $now,
                                    'updated_at'   => $now,
                                ],
                            ]);
                        } else {
                            $this->aggregateAdvertises = $this->aggregateAdvertises->replace([
                                $oldAggregateAdvertiseKey => [
                                    'link'         => $advertiseCounter->link,
                                    'advertise_id' => $advertiseCounter->advertise_id,
                                    'date'         => $formatDate,
                                    'count'        => $oldAggregateAdvertise['count'] + $advertiseCounter->count,
                                    'created_at'   => $now,
                                    'updated_at'   => $now,
                                ],
                            ]);
                        }

                        Log::debug('AdvertiseCounter', [
                            $this->aggregateAdvertises,
                            $oldAggregateAdvertiseKey,
                            $oldAggregateAdvertise,
                        ]);
                    }
                }
            );

        Log::debug('AdvertiseCounterHistory start', [
            $this->aggregateAdvertises,
        ]);
        AdvertiseCounterHistory::query()
            ->chunk(
                100,
                function ($advertiseCounterHistories) {
                    foreach ($advertiseCounterHistories as $advertiseCounterHistory) {
                        $nowAggregateAdvertiseKey = null;
                        $nowAggregateAdvertise = null;
                        foreach ($this->aggregateAdvertises->toArray() as $key => $aggregateAdvertise) {
                            if (
                                $aggregateAdvertise &&
                                $aggregateAdvertise['link'] === $advertiseCounterHistory->link &&
                                $aggregateAdvertise['advertise_id'] === $advertiseCounterHistory->advertise_id
                            ) {
                                $nowAggregateAdvertise = $aggregateAdvertise;
                                $nowAggregateAdvertiseKey = $key;
                                break;
                            }
                        }

                        if (is_null($nowAggregateAdvertise)) {
                            continue;
                        }

                        $this->aggregateAdvertises = $this->aggregateAdvertises->replace([
                            $nowAggregateAdvertiseKey => [
                                'link'         => $nowAggregateAdvertise['link'],
                                'advertise_id' => $nowAggregateAdvertise['advertise_id'],
                                'date'         => $nowAggregateAdvertise['date'],
                                'count'        => $nowAggregateAdvertise['count'] - $advertiseCounterHistory->count,
                                'created_at'   => $nowAggregateAdvertise['created_at'],
                                'updated_at'   => $nowAggregateAdvertise['updated_at'],
                            ],
                        ]);
                    }

                    Log::debug('AdvertiseCounterHistory', [
                        $this->aggregateAdvertises,
                    ]);
                }
            );

        Log::debug('AdvertiseCounterHistory insert', [
            $this->aggregateAdvertises->toArray(),
        ]);
        AdvertiseCounterHistory::insert($this->aggregateAdvertises->toArray());
    }
}
