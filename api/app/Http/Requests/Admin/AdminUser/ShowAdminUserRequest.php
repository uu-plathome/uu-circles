<?php

namespace App\Http\Requests\Admin\AdminUser;

use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ShowAdminUserRequest extends FormRequest
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
        return Arr::camel_keys([]);
    }

    public function attributes()
    {
        return Arr::camel_keys([]);
    }
}
