<?php

use App\Models\User;
use App\Models\UserToken;
use App\Repositories\CreateAdminUserRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    private CreateAdminUserRepository $createAdminUserRepository;

    public function __construct(CreateAdminUserRepository $createAdminUserRepository)
    {
        $this->createAdminUserRepository = $createAdminUserRepository;
    }

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
            /** @var User $user */
            $user = factory(User::class)->create();
            $user->adminUser()->create();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
