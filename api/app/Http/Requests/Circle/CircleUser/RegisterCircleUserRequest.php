<?php

namespace App\Http\Requests\Circle\CircleUser;

use App\Enum\Property\UserProperty;
use App\Support\Arr;
use App\Usecases\CircleManagement\CircleUser\Params\CreateCircleUserUsecaseParam;
use Illuminate\Foundation\Http\FormRequest;

class RegisterCircleUserRequest extends FormRequest
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
            UserProperty::username     => ['required', 'string', 'max:30', 'alpha_dash', 'unique:users,username'],
            UserProperty::display_name => ['nullable', 'string', 'max:50'],
            UserProperty::email        => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
        ]);
    }

    public function makeCreateCircleUserUsecaseParam(): CreateCircleUserUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new CreateCircleUserUsecaseParam();
        $param->circle_id = $this->circleId;
        $param->username = Arr::get($request, UserProperty::username);
        $param->display_name = Arr::get($request, UserProperty::display_name);
        $param->email = Arr::get($request, UserProperty::email);

        return $param;
    }
}
