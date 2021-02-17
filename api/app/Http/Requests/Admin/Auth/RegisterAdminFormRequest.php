<?php

namespace App\Http\Requests\Admin\Auth;

use App\Enum\Propety\AdminUserPropety;
use App\Enum\Role;
use App\Enum\UserModel;
use App\Models\User;
use App\Rules\RegexPassword;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class RegisterAdminFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->adminUser->isManager();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Arr::camel_keys([
            UserModel::username     => ['required', 'string', 'max:30', 'alpha_dash',  'unique:users'],
            UserModel::display_name => ['nullable', 'string', 'max:50'],
            UserModel::email        => ['required', 'string', 'email', 'max:255', 'unique:users'],
            AdminUserPropety::role  => ['required', 'string'],
        ]);
    }

    public function makeAdminUserValueObject(): AdminUserValueObject
    {
        $request = Arr::snake_keys($this->validated());

        return AdminUserValueObject::of([
            UserModel::display_name => $request[UserModel::display_name],
            UserModel::username     => $request[UserModel::username],
            UserModel::email        => $request[UserModel::email],
            AdminUserPropety::role  => $request[AdminUserPropety::role],
        ]);
    }
}
