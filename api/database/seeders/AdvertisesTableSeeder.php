<?php

namespace Database\Seeders;

use App\Enum\Property\AdvertiseCounterProperty;
use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdvertisesTableSeeder extends Seeder
{
    const COUNTER_ROWS = 20;

    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
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
                ->each(function (Advertise $advertise) use ($idx, $now) {
                    $advertise->fill([
                        'title' => $advertise->title . $idx,
                        'slug'  => Str::uuid(),
                    ])->save();
                    $idx++;

                    $advertiseCounter = [];

                    for ($i = self::COUNTER_ROWS; $i > 0; $i--) {
                        $advertiseCounter[] = [
                            AdvertiseCounterProperty::link         => $advertise->link,
                            AdvertiseCounterProperty::count        => rand(0, 1000),
                            AdvertiseCounterProperty::advertise_id => $advertise->id,
                            AdvertiseCounterProperty::created_at   => $now,
                            AdvertiseCounterProperty::updated_at   => $now,
                        ];
                    }

                    AdvertiseCounter::insert($advertiseCounter);
                });

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }

        Artisan::call('aggregate:advertise-counter');
    }
}
