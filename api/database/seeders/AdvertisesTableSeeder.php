<?php

namespace Database\Seeders;

use App\Enum\Property\AdvertiseCounterProperty;
use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use App\UseCases\Batch\Advertise\AggregateAdvertiseCounterPerDayUsecase;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdvertisesTableSeeder extends Seeder
{
    const COUNTER_ROWS = 20;

    private AggregateAdvertiseCounterPerDayUsecase $aggregateAdvertiseCounterPerDayUsecase;

    public function __construct(
        AggregateAdvertiseCounterPerDayUsecase $aggregateAdvertiseCounterPerDayUsecase
    ) {
        $this->aggregateAdvertiseCounterPerDayUsecase = $aggregateAdvertiseCounterPerDayUsecase;
    }

    /**
     * Run the database seeds.
     *
     * @throws Exception
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();

        try {
            $idx = 1;
            $now = Carbon::now();
            /** @var Advertise $user */
            factory(Advertise::class, 10)
                ->make()
                ->each(function (Advertise $advertise) use ($idx) {
                    $advertise->fill([
                        AdvertiseProperty::title          => $advertise->title.$idx,
                        AdvertiseProperty::slug           => Str::uuid()->toString(),
                        AdvertiseProperty::active         => $idx === 1,
                        AdvertiseProperty::main_image_url => $idx === 1 ?
                            'https://static.uu-circles.com/images/E8acivKGZzLpaifgsWCrSYqnPzssstUFQ9ViqeBt.jpg' :
                            null,
                    ])->save();
                });

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }

        $this->insertAdvertiseCounter(
            Advertise::all(),
            $now
        );
    }

    private function insertAdvertiseCounter(Collection $advertises, Carbon $now)
    {
        $advertiseCounter = [];

        // 2日前
        $twoDaysAgo = $now->copy()->subDay()->subDay();
        foreach ($advertises as $advertise) {
            for ($i = self::COUNTER_ROWS; $i > 0; $i--) {
                $advertiseCounter[] = [
                    AdvertiseCounterProperty::count              => rand(0, 1000),
                    AdvertiseCounterProperty::advertise_id       => $advertise->id,
                    AdvertiseCounterProperty::link               => $advertise->link,
                    AdvertiseCounterProperty::created_at         => $twoDaysAgo,
                    AdvertiseCounterProperty::updated_at         => $twoDaysAgo,
                ];
            }
        }
        AdvertiseCounter::insert($advertiseCounter);
        // 2日前に集計する
        $this->aggregateAdvertiseCounterPerDayUsecase->invoke($twoDaysAgo);

        // 1日前
        $oneDaysAgo = $now->copy()->subDay();
        AdvertiseCounter::query()
            ->chunk(
                200,
                function ($advertiseCounters) {
                    DB::beginTransaction();

                    try {
                        /** @var AdvertiseCounter $advertiseCounter */
                        foreach ($advertiseCounters as $advertiseCounter) {
                            $advertiseCounter
                                ->increment(AdvertiseCounterProperty::count, rand(0, 1000));
                        }

                        DB::commit();
                    } catch (\Exception $e) {
                        DB::rollback();
                    }
                }
            );
        // 1日前に集計する
        $this->aggregateAdvertiseCounterPerDayUsecase->invoke($oneDaysAgo);

        // 今日
        AdvertiseCounter::query()
            ->chunk(
                200,
                function ($advertiseCounters) {
                    DB::beginTransaction();

                    try {
                        /** @var AdvertiseCounter $advertiseCounter */
                        foreach ($advertiseCounters as $advertiseCounter) {
                            $advertiseCounter
                                ->increment(AdvertiseCounterProperty::count, rand(0, 1000));
                        }

                        DB::commit();
                    } catch (\Exception $e) {
                        DB::rollback();
                    }
                }
            );
        // 今日、集計する
        $this->aggregateAdvertiseCounterPerDayUsecase->invoke($now);
    }
}
