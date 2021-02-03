<?php

use App\Enum\CircleType;
use App\Models\Circle;
use App\Models\CircleInformation;
use App\Models\User;
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
                $circle->circleInformation()->save(factory(CircleInformation::class)->make([
                    'name'        => "U-lab {$circle->id}",
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

            factory(Circle::class, 4)->state('非公開')->create()->each(function (Circle $circle) {
                $circle->circleInformation()->save(factory(CircleInformation::class)->make([
                    'name'        => "U-lab {$circle->id}",
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
}
