<?php

namespace App\Http\Requests\Admin\Auth;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Property\UserProperty;
use App\Models\User;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

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
            UserProperty::username     => ['required', 'string', 'max:30', 'alpha_dash',  'unique:users'],
            UserProperty::display_name => ['nullable', 'string', 'max:50'],
            UserProperty::email        => ['required', 'string', 'email', 'max:255', 'unique:users'],
            AdminUserProperty::role    => ['required', 'string'],
        ]);
    }

    public function makeAdminUserValueObject(): AdminUserValueObject
    {
        $request = Arr::snake_keys($this->validated());

        return AdminUserValueObject::of([
            UserProperty::display_name => $request[UserProperty::display_name],
            UserProperty::username     => $request[UserProperty::username],
            UserProperty::email        => $request[UserProperty::email],
            AdminUserProperty::role    => $request[AdminUserProperty::role],
        ]);
    }
}
