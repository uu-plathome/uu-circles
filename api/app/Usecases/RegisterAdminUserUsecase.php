<?php

namespace App\Usecases;

use App\Models\User;
use App\Repositories\CreateAdminUserRepository;
use App\Repositories\GetAdminUserRepository;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;

class RegisterAdminUserUsecase
{
    private CreateAdminUserRepository $createAdminUserRepository;

    private GetAdminUserRepository $getAdminUserRepository;

    /**
     * Create a new usecase instance.
     *
     * @param CreateAdminUserRepository $createAdminUserRepository
     * @param GetAdminUserRepository $getAdminUserRepository
     */
    public function __construct(
        CreateAdminUserRepository $createAdminUserRepository,
        GetAdminUserRepository $getAdminUserRepository
    ) {
        $this->createAdminUserRepository = $createAdminUserRepository;
        $this->getAdminUserRepository = $getAdminUserRepository;
    }

    /**
     * invoke
     *
     * @param array $inputs
     * @return array
     * @throws Exception
     */
    public function invoke(array $inputs): array
    {
        DB::beginTransaction();

        try {
            $userId = $this->createAdminUserRepository->invoke($inputs);

            DB::commit();

            // 認証メールの通知
            event(new Registered(User::whereId($userId)->first()));

            return $this->getAdminUserRepository->invoke($userId);
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
