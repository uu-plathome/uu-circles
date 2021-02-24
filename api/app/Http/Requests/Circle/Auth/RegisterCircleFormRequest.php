<?php

namespace App\Http\Requests\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Models\User;
use App\Support\Arr;
use App\ValueObjects\CircleUserValueObject;
use Illuminate\Foundation\Http\FormRequest;

class RegisterCircleFormRequest extends FormRequest
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
            UserProperty::username     => ['required', 'string', 'max:30', 'alpha_dash',  'unique:users'],
            UserProperty::display_name => ['nullable', 'string', 'max:50'],
            UserProperty::email        => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);
    }

    public function makeCircleUserValueObject(): CircleUserValueObject
    {
        $user = new User();
        $user->display_name = $this->displayName;
        $user->username = $this->username;
        $user->email = $this->email;
        return CircleUserValueObject::byEloquent($user);
    }
}
