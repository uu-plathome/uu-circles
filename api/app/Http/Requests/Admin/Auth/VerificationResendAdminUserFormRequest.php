<?php

namespace App\Http\Requests\Admin\Auth;

use App\Enum\Property\UserProperty;
use Illuminate\Foundation\Http\FormRequest;

class VerificationResendAdminUserFormRequest extends FormRequest
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
}
