<?php

declare(strict_types=1);

namespace App\Usecases\Batch\Announcement;

use App\Enum\Property\AnnouncementCounterHistoryProperty as ACHP;
use App\Models\AnnouncementCounter;
use App\Models\AnnouncementCounterHistory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

final class AggregateAnnouncementCounterPerDayUsecase
{
    private Collection $aggregateAnnouncements;

    /**
     * 指定された日として、お知らせのクリック数を集計する.
     *
     * @param Carbon $date
     */
    public function invoke(Carbon $date)
    {
        $formatDate = $date->format('Y-m-d');
        $now = Carbon::now();

        $this->aggregateAnnouncements = new Collection([]);

        AnnouncementCounter::query()
            ->chunk(
                100,
                function ($announcementCounters) use ($formatDate, $now) {
                    /** @var AnnouncementCounter $announcementCounter */
                    foreach ($announcementCounters as $announcementCounter) {
                        $oldAggregateAnnouncementKey = null;
                        $oldAggregateAnnouncement = null;
                        foreach ($this->aggregateAnnouncements->toArray() as $key => $aggregateAnnouncement) {
                            if (
                                $aggregateAnnouncement &&
                                $aggregateAnnouncement[ACHP::announcement_place] === $announcementCounter->announcement_place &&
                                $aggregateAnnouncement[ACHP::announcement_id] === $announcementCounter->announcement_id
                            ) {
                                $oldAggregateAnnouncement = $aggregateAnnouncement;
                                $oldAggregateAnnouncementKey = $key;
                                break;
                            }
                        }

                        if (is_null($oldAggregateAnnouncementKey)) {
                            $this->aggregateAnnouncements = $this->aggregateAnnouncements->merge([
                                [
                                    ACHP::announcement_id    => $announcementCounter->announcement_id,
                                    ACHP::announcement_place => $announcementCounter->announcement_place,
                                    ACHP::date               => $formatDate,
                                    ACHP::count              => $announcementCounter->count,
                                    ACHP::created_at         => $now,
                                    ACHP::updated_at         => $now,
                                ],
                            ]);
                        } else {
                            $this->aggregateAnnouncements = $this->aggregateAnnouncements->replace([
                                $oldAggregateAnnouncementKey => [
                                    ACHP::announcement_id    => $announcementCounter->announcement_id,
                                    ACHP::announcement_place => $announcementCounter->announcement_place,
                                    ACHP::date               => $formatDate,
                                    ACHP::count              => $oldAggregateAnnouncement[ACHP::count] + $announcementCounter->count,
                                    ACHP::created_at         => $now,
                                    ACHP::updated_at         => $now,
                                ],
                            ]);
                        }

                        Log::debug('AnnouncementCounter', [
                            $this->aggregateAnnouncements,
                            $oldAggregateAnnouncementKey,
                            $oldAggregateAnnouncement,
                        ]);
                    }
                }
            );

        Log::debug('AnnouncementCounterHistory start', [
            $this->aggregateAnnouncements,
        ]);
        AnnouncementCounterHistory::query()
            ->chunk(
                100,
                function ($announcementCounterHistories) {
                    /** @var AnnouncementCounterHistory $announcementCounterHistory */
                    foreach ($announcementCounterHistories as $announcementCounterHistory) {
                        $nowAggregateAnnouncementKey = null;
                        $nowAggregateAnnouncement = null;
                        foreach ($this->aggregateAnnouncements->toArray() as $key => $aggregateAnnouncement) {
                            if (
                                $aggregateAnnouncement &&
                                $aggregateAnnouncement[ACHP::announcement_place] === $announcementCounterHistory->announcement_place &&
                                $aggregateAnnouncement[ACHP::announcement_id] === $announcementCounterHistory->announcement_id
                            ) {
                                $nowAggregateAnnouncement = $aggregateAnnouncement;
                                $nowAggregateAnnouncementKey = $key;
                                break;
                            }
                        }

                        if (is_null($nowAggregateAnnouncement)) {
                            continue;
                        }

                        $this->aggregateAnnouncements = $this->aggregateAnnouncements->replace([
                            $nowAggregateAnnouncementKey => [
                                ACHP::announcement_id    => $nowAggregateAnnouncement[ACHP::announcement_id],
                                ACHP::announcement_place => $nowAggregateAnnouncement[ACHP::announcement_place],
                                ACHP::date               => $nowAggregateAnnouncement[ACHP::date],
                                ACHP::count              => $nowAggregateAnnouncement[ACHP::count] - $announcementCounterHistory->count,
                                ACHP::created_at         => $nowAggregateAnnouncement[ACHP::created_at],
                                ACHP::updated_at         => $nowAggregateAnnouncement[ACHP::updated_at],
                            ],
                        ]);
                    }

                    Log::debug('AnnouncementCounterHistory', [
                        $this->aggregateAnnouncements,
                    ]);
                }
            );

        $filterOnlyNaturalNumber = $this->aggregateAnnouncements->filter(
            fn (array $arr) => $arr[ACHP::count] > 0
        );

        Log::debug('AnnouncementCounterHistory insert', [
            $filterOnlyNaturalNumber->toArray(),
        ]);
        AnnouncementCounterHistory::insert($filterOnlyNaturalNumber->toArray());
    }
}
