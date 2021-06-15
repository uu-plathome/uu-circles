<?php

namespace Database\Seeders;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Role;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
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
            /** @var User $user */
            $user = factory(User::class)->state('admin')->create();
            $user->adminUser()->create([
                AdminUserProperty::role => Role::SYSTEM,
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
