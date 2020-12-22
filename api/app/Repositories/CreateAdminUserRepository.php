<?php

namespace App\Repositories;

use App\Enum\UserModel;
use App\Models\User;
use App\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CreateAdminUserRepository
{
    /**
     * Create a new repository instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * invoke
     *
     * @param array $inputs
     * @return int
     */
    public function invoke(array $inputs): int
    {
        $inputsForUser = $this->getUserInputData($inputs);

        $user = User::create($inputsForUser);

        return $user->id;
    }

    private function getUserInputData(array $inputs): array
    {
        $username = Arr::get($inputs, UserModel::username);
        $displayName = Arr::get($inputs, UserModel::display_name);
        if ($displayName === null) {
            $displayName = $username;
        }

        return [
            UserModel::username       => $username,
            UserModel::display_name   => $displayName,
            UserModel::active         => true,
            UserModel::email          => Arr::get($inputs, UserModel::email),
            UserModel::api_token      => Str::random(80),
            UserModel::password       => Hash::make(Arr::get($inputs, UserModel::password)),
            UserModel::remember_token => Str::random(10),
        ];
    }
}
