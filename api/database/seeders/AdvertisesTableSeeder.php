<?php

namespace Database\Seeders;

use App\Enum\Property\AdvertiseCounterProperty;
use App\Enum\Property\AdvertiseProperty;
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
                        AdvertiseProperty::title  => $advertise->title . $idx,
                        AdvertiseProperty::slug   => Str::uuid(),
                        AdvertiseProperty::active => $idx === 1,
                        AdvertiseProperty::main_image_url => $idx === 1 ?
                            'https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/o/circles%2Fcycle-club.jpg?alt=media&token=d934d034-58f9-4082-bf72-2f2524713ddc' :
                            null,
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
