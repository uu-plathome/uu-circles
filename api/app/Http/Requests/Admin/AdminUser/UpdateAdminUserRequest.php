<?php


namespace App\Http\Requests\Admin\AdminUser;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Role;
use App\Enum\UserModel;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateAdminUserRequest extends FormRequest
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
            UserModel::username     => ['required', 'string', 'max:30', 'alpha_dash', 'unique:users,username,' . $this->userId],
            UserModel::display_name => ['required', 'string', 'max:50'],
            UserModel::active       => ['required', 'boolean'],
            AdminUserProperty::role  => ['required', 'string'],
        ]);
    }

    public function makeAdminUserValueObject(): AdminUserValueObject
    {
        $request = Arr::snake_keys($this->validated());

        return AdminUserValueObject::of([
            UserModel::username     => $request[UserModel::username],
            UserModel::display_name => $request[UserModel::display_name],
            UserModel::active       => $request[UserModel::active],
            AdminUserProperty::role  => $request[AdminUserProperty::role],
        ]);
    }
}
