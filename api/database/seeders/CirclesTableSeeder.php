<?php

namespace Database\Seeders;

use App\Enum\CircleType;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CirclesTableSeeder extends Seeder
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
            factory(Circle::class, 20)->create()->each(function (Circle $circle) {
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
                    $user->circleUser()->create([
                        'circle_id' => $circle->id,
                    ]);
                });

                factory(User::class, 1)->create([
                    'username'     => "no-udai-{$circle->id}",
                    'display_name' => "no-udai-{$circle->id}",
                    'active'       => false,
                ])->each(function (User $user) use ($circle) {
                    $user->circleUser()->create([
                        'circle_id' => $circle->id,
                    ]);
                });

                if ($this->getCircleHandbillImageUrl($circle->id)) {
                    CircleHandbill::create([
                        'circle_id' => $circle->id,
                        'image_url' => $this->getCircleHandbillImageUrl($circle->id),
                        'year'      => 2021,
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
                    $user->circleUser()->create([
                        'circle_id' => $circle->id,
                    ]);
                });

                factory(User::class, 1)->create([
                    'username'     => "no-udai-{$circle->id}",
                    'display_name' => "no-udai-{$circle->id}",
                    'active'       => false,
                ])->each(function (User $user) use ($circle) {
                    $user->circleUser()->create([
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
            return 'https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/o/circles%2Fzzu-lab.jpg?alt=media&token=7b432c71-f65a-4064-9339-7545cc762791';
        }

        if ($idx % 6 == 1) {
            // 滑空部
            return 'https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/o/circles%2Fflyclub2.jpg?alt=media&token=405b82c6-ac28-47f9-ac62-33a4ff09e7f9';
        }

        if ($idx % 6 == 2) {
            // メロディースタッフ
            return 'https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/o/circles%2Fmelody-staff.jpg?alt=media&token=1b069154-1137-4621-953d-35fe39f6113b';
        }

        if ($idx % 6 == 3) {
            // 硬式テニス部
            return 'https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/o/circles%2Fhardtenis.jpg?alt=media&token=5abe0fab-d088-4d22-bc2c-00fcfe9a1b0e';
        }

        if ($idx % 6 == 4) {
            // cycle club
            return 'https://firebasestorage.googleapis.com/v0/b/uu-circle20.appspot.com/o/circles%2Fcycle-club.jpg?alt=media&token=d934d034-58f9-4082-bf72-2f2524713ddc';
        }

        if ($idx % 6 == 5) {
            // 新歓ビラのデータを抜く
            return null;
        }
    }
}
