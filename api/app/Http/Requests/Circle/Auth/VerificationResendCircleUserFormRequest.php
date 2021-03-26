<?php

namespace App\Http\Requests\Circle\Auth;

use App\Enum\Property\UserProperty;
use Illuminate\Foundation\Http\FormRequest;

class VerificationResendCircleUserFormRequest extends FormRequest
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
        return [
            UserProperty::email => ['required', 'email', 'string']
        ];
    }

    public function attributes()
    {
        return [
            UserProperty::email => __('user.' . UserProperty::email),
        ];
    }
}
