<?php

namespace App\Http\Requests\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCircleUserRequest extends FormRequest
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
            UserProperty::username     => ['required', 'string', 'max:30', 'alpha_dash'],
            UserProperty::display_name => ['required', 'string', 'max:50'],
            CircleUserProperty::role   => [
                'required',
                'string',
                Rule::in([Role::MANAGER, Role::COMMON])
            ]
        ]);
    }
}
