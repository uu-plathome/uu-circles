<?php

namespace Database\Seeders;

use App\Enum\Property\AnnouncementCounterProperty;
use App\Models\Announcement;
use App\Models\AnnouncementCounter;
use App\Usecases\Batch\Announcement\AggregateAnnouncementCounterPerDayUsecase;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class AnnouncementSeeder extends Seeder
{
    private AggregateAnnouncementCounterPerDayUsecase $aggregateAnnouncementCounterPerDayUsecase;

    public function __construct(
        AggregateAnnouncementCounterPerDayUsecase $aggregateAnnouncementCounterPerDayUsecase
    ) {
        $this->aggregateAnnouncementCounterPerDayUsecase = $aggregateAnnouncementCounterPerDayUsecase;
    }

    /**
     * Run the database seeds.
     *
     * @throws \Exception
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        $now = Carbon::now();

        $ids = [];

        DB::beginTransaction();

        try {
            // 通常のお知らせ
            $announcement = Announcement::factory()
                ->count(1)
                ->create()
                ->first();
            $ids[] = $announcement->id;

            // 管理者画面のみ固定
            $announcement = Announcement::factory()
                ->count(1)
                ->isAdminViewFixed()
                ->create()
                ->first();
            $ids[] = $announcement->id;
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
        }

        // ここはトランザクションを関数内で貼りたいので、トランザクションの外にしている。
        $this->insertAnnouncementCounter($ids, $now);
    }

    private function insertAnnouncementCounter(array $announcementIds, Carbon $now)
    {
        $columnNumbers = AnnouncementCounter::columnNumbers();

        $announcementCounter = [];

        // 2日前
        $twoDaysAgo = $now->copy()->subDay()->subDay();
        foreach ($announcementIds as $announcementId) {
            foreach ($columnNumbers as $announcementPlace => $maxColumnNumber) {
                for ($i = $maxColumnNumber; $i > 0; $i--) {
                    $announcementCounter[] = [
                        AnnouncementCounterProperty::count              => rand(0, 1000),
                        AnnouncementCounterProperty::announcement_id    => $announcementId,
                        AnnouncementCounterProperty::announcement_place => $announcementPlace,
                        AnnouncementCounterProperty::created_at         => $twoDaysAgo,
                        AnnouncementCounterProperty::updated_at         => $twoDaysAgo,
                    ];
                }
            }
        }
        AnnouncementCounter::insert($announcementCounter);
        // 2日前に集計する
        $this->aggregateAnnouncementCounterPerDayUsecase->invoke($twoDaysAgo);

        // 1日前
        $oneDaysAgo = $now->copy()->subDay();
        AnnouncementCounter::query()
            ->chunk(
                200,
                function ($announcementCounters) {
                    DB::beginTransaction();

                    try {
                        /** @var AnnouncementCounter $announcementCounter */
                        foreach ($announcementCounters as $announcementCounter) {
                            $announcementCounter
                                ->increment(AnnouncementCounterProperty::count, rand(0, 1000));
                        }

                        DB::commit();
                    } catch (\Exception $e) {
                        DB::rollback();
                    }
                }
            );
        // 1日前に集計する
        $this->aggregateAnnouncementCounterPerDayUsecase->invoke($oneDaysAgo);

        // 今日
        AnnouncementCounter::query()
            ->chunk(
                200,
                function ($announcementCounters) {
                    DB::beginTransaction();

                    try {
                        /** @var AnnouncementCounter $announcementCounter */
                        foreach ($announcementCounters as $announcementCounter) {
                            $announcementCounter
                                ->increment(AnnouncementCounterProperty::count, rand(0, 1000));
                        }

                        DB::commit();
                    } catch (\Exception $e) {
                        DB::rollback();
                    }
                }
            );
        // 今日、集計する
        $this->aggregateAnnouncementCounterPerDayUsecase->invoke($now);
    }
}
