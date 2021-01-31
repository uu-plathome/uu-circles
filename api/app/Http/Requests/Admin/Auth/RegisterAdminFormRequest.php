<?php

namespace App\Http\Requests\Admin\Auth;

use App\Enum\UserModel;
use App\Models\User;
use App\Rules\RegexPassword;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Http\FormRequest;

class RegisterAdminFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
        ]);
    }

    public function makeAdminUserValueObject(): AdminUserValueObject
    {
        $user = new User();
        $user->display_name = $this->displayName;
        $user->username = $this->username;
        $user->email = $this->email;
        return AdminUserValueObject::byEloquent($user);
    }
}
