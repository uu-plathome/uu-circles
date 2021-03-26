<?php

namespace App\Http\Requests\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Role;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ImportCircleUserRequest extends FormRequest
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
            CircleUserProperty::role   => [
                'required',
                'string',
                Rule::in([Role::MANAGER, Role::COMMON])
            ]
        ]);
    }

    public function attributes()
    {
        return [
            CircleUserProperty::role   => __('circleUser.' . CircleUserProperty::role),
        ];
    }
}
