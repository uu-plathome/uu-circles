<?php

namespace Database\Seeders;

use App\Models\Advertise;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdvertisesTableSeeder extends Seeder
{
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
            /** @var Advertise $user */
            factory(Advertise::class, 10)
                ->make()
                ->each(function (Advertise $advertise) use ($idx) {
                    $advertise->fill([
                        'title' => $advertise->title . $idx,
                    ])->save();
                    $idx++;
                });

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
