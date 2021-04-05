<?php

namespace App\Http\Requests\Admin\AdminUser;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Role;
use App\Enum\Property\UserProperty;
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
            UserProperty::username     => [
                'required',
                'string',
                'max:30',
                'alpha_dash',
            ],
            UserProperty::display_name => ['required', 'string', 'max:50'],
            UserProperty::active       => ['required', 'boolean'],
            AdminUserProperty::role    => ['required', 'string'],
        ]);
    }
    public function attributes()
    {
        return [
            UserProperty::username     => __('user.' . UserProperty::username),
            UserProperty::display_name => __('user.' . UserProperty::display_name),
            UserProperty::email        => __('user.' . UserProperty::email),
            AdminUserProperty::role    => __('adminUser.' . AdminUserProperty::role),
        ];
    }

    public function makeAdminUserValueObject(): AdminUserValueObject
    {
        $request = Arr::snake_keys($this->validated());

        return AdminUserValueObject::of([
            UserProperty::username     => $request[UserProperty::username],
            UserProperty::display_name => $request[UserProperty::display_name],
            UserProperty::active       => $request[UserProperty::active],
            AdminUserProperty::role  => $request[AdminUserProperty::role],
        ]);
    }
}
