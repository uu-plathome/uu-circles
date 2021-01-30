<?php


namespace App\Http\Requests\Admin\CircleUser;


use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

class VerificationEmailCircleUserRequest extends FormRequest
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
            'password' => 'required|string|min:8',
        ]);
    }
}
