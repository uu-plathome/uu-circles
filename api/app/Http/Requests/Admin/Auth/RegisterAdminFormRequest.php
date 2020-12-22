<?php

namespace App\Http\Requests\Admin\Auth;

use App\Enum\UserModel;
use App\Rules\RegexPassword;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

class RegisterAdminFormRequest extends FormRequest
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
            UserModel::username => ['required', 'string', 'max:30', 'alpha_dash'],
            UserModel::email    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            UserModel::password => ['required', 'string', new RegexPassword() ],
        ]);
    }
}
