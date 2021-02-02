<?php

namespace App\Http\Requests\Admin\Auth;

use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordAdminRequest extends FormRequest
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
            'email'    => 'required|string|email|max:255',
        ]);
    }
}
