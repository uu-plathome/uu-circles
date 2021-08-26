<?php

namespace Database\Seeders;

use App\Enum\CircleType;
use App\Enum\Property\CircleProperty;
use App\Enum\Property\CircleTagProperty;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;
use App\Models\CircleNewJoy;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CirclesTableSeeder extends Seeder
{
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
            factory(Circle::class, 30)->create()->each(function (Circle $circle, $idx) {
                $isDemoFixed = random_int(0, 1) === 1;
                $circle->update([
                    CircleProperty::name          => "U-lab {$circle->id}",
                    CircleProperty::is_demo_fixed => $isDemoFixed,
                    CircleProperty::demo_priority => $isDemoFixed ? random_int(0, 10) : 0,
                ]);

                $circle->circleInformation()->save(factory(CircleInformation::class)->make([
                    'circle_type' => $this->getCircleType($circle->id),
                ]));

                $circle->circleNewJoys()->save(factory(CircleNewJoy::class)->make([
                    'title'  => "交流会 {$circle->id} 1",
                ]));

                $circle->circleNewJoys()->save(factory(CircleNewJoy::class)->make([
                    'title'      => "交流会 {$circle->id} 2",
                    'start_date' => Carbon::now()->addDay(1)->subHour(1),
                    'end_date'   => Carbon::now()->addDay(1)->addHour(1),
                ]));

                $circle->circleNewJoys()->save(factory(CircleNewJoy::class)->make([
                    'title'      => "交流会 {$circle->id} 3",
                    'start_date' => Carbon::now()->addDay(2)->subHour(1),
                    'end_date'   => Carbon::now()->addDay(2)->addHour(1),
                ]));

                $circle->circleNewJoys()->save(factory(CircleNewJoy::class)->state('pastFixed')->make());
                $circle->circleNewJoys()->save(factory(CircleNewJoy::class)->state('futureFixed')->make());

                factory(User::class, 1)->create([
                    'username'     => "udai-{$circle->id}",
                    'display_name' => "udai-{$circle->id}",
                ])->each(function (User $user) use ($circle) {
                    $user->circleUsers()->create([
                        'circle_id' => $circle->id,
                    ]);
                });

                factory(User::class, 1)->create([
                    'username'     => "no-udai-{$circle->id}",
                    'display_name' => "no-udai-{$circle->id}",
                    'active'       => false,
                ])->each(function (User $user) use ($circle) {
                    $user->circleUsers()->create([
                        'circle_id' => $circle->id,
                    ]);
                });

                if (!$this->getCircleHandbillImageUrl($circle->id)) {
                    return;
                }

                CircleHandbill::create([
                    'circle_id' => $circle->id,
                    'image_url' => $this->getCircleHandbillImageUrl($circle->id),
                    'year'      => 2021,
                ]);

                if ($idx % 2 === 0) {
                    $circle->circleTag()->create([
                        CircleTagProperty::sport              => rand(0, 1) === 0,
                        CircleTagProperty::community          => rand(0, 1) === 0,
                        CircleTagProperty::culture            => rand(0, 1) === 0,
                        CircleTagProperty::music              => rand(0, 1) === 0,
                        CircleTagProperty::nature             => rand(0, 1) === 0,
                        CircleTagProperty::volunteer          => rand(0, 1) === 0,
                        CircleTagProperty::international      => rand(0, 1) === 0,
                        CircleTagProperty::loose              => rand(0, 1) === 0,
                        CircleTagProperty::programming        => rand(0, 1) === 0,
                        CircleTagProperty::urgent_recruitment => rand(0, 1) === 0,
                        CircleTagProperty::mystery            => rand(0, 1) === 0,
                    ]);
                }
            });

            factory(Circle::class, 4)->state('非公開')->create()->each(function (Circle $circle) {
                $circle->update([
                    'name'        => "U-lab {$circle->id}",
                ]);

                $circle->circleInformation()->save(factory(CircleInformation::class)->make([
                    'circle_type' => $this->getCircleType($circle->id),
                ]));

                factory(User::class, 1)->create([
                    'username'     => "udai-{$circle->id}",
                    'display_name' => "udai-{$circle->id}",
                ])->each(function (User $user) use ($circle) {
                    $user->circleUsers()->create([
                        'circle_id' => $circle->id,
                    ]);
                });

                factory(User::class, 1)->create([
                    'username'     => "no-udai-{$circle->id}",
                    'display_name' => "no-udai-{$circle->id}",
                    'active'       => false,
                ])->each(function (User $user) use ($circle) {
                    $user->circleUsers()->create([
                        'circle_id' => $circle->id,
                    ]);
                });
            });

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    private function getCircleType(int $idx): string
    {
        if ($idx % 4 === 0) {
            return CircleType::OFFICIAL_ORGANIZATION;
        }

        if ($idx % 4 === 1) {
            return CircleType::UNOFFICIAL_ORGANIZATION;
        }

        if ($idx % 4 === 2) {
            return CircleType::STUDENT_GROUP;
        }

        if ($idx % 4 === 3) {
            return CircleType::SENDING_ORGANIZATION;
        }
    }

    private function getCircleHandbillImageUrl(int $idx): ?string
    {
        if ($idx % 6 == 0) {
            // U-lab
            return 'https://static.uu-circles.com/images/wYrgrNzRcyztp1mwmvdFpTVGWfSfEOoNagzO8eFl.png';
        }

        if ($idx % 6 == 1) {
            // TinCarbel
            return 'https://static.uu-circles.com/images/DE9kVZkJyiJVdQtZYJ2GF2qc29tOf9MwaKIS8n7d.png';
        }

        if ($idx % 6 == 2) {
            // uu-yell
            return 'https://static.uu-circles.com/DOMChKiSFmifuypt2OLF4mMZb8plCD6bm64T1j3A.jpg';
        }

        if ($idx % 6 == 3) {
            // 硬式テニス部
            return 'https://static.uu-circles.com/images/kN6BV35XRZeYZd3u5DtSyz8W0TT6i93ezeBcM37P.png';
        }

        if ($idx % 6 == 4) {
            // U-lab
            return 'https://static.uu-circles.com/images/wYrgrNzRcyztp1mwmvdFpTVGWfSfEOoNagzO8eFl.png';
        }

        if ($idx % 6 == 5) {
            // 新歓ビラのデータを抜く
            return null;
        }
    }
}
