<?php

namespace App\Http\Requests\Admin\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Support\Arr;
use App\UseCases\AdminManagement\CircleUser\Params\UpdateCircleUserUsecaseParam;
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
            UserProperty::username     => ['required', 'string', 'max:30', 'alpha_dash', 'unique:users,username,'.$this->userId],
            UserProperty::display_name => ['required', 'string', 'max:50'],
            UserProperty::active       => ['required', 'boolean'],
            CircleUserProperty::role   => [
                'required',
                'string',
                Rule::in([Role::MANAGER, Role::COMMON]),
            ],
        ]);
    }

    public function makeUpdateCircleUserUsecaseParam(): UpdateCircleUserUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new UpdateCircleUserUsecaseParam();
        $param->user_id = $this->userId;
        $param->circle_id = $this->circleId;
        $param->username = Arr::get($request, UserProperty::username);
        $param->display_name = Arr::get($request, UserProperty::display_name);
        $param->active = Arr::get($request, UserProperty::active);
        $param->role = Arr::get($request, CircleUserProperty::role);

        return $param;
    }
}
