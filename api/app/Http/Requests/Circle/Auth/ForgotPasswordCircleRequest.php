<?php

namespace App\Http\Requests\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordCircleRequest extends FormRequest
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
            UserProperty::email => 'required|string|email|max:255',
        ]);
    }

    public function attributes()
    {
        return [
            UserProperty::email => __('user.' . UserProperty::email),
        ];
    }
}
