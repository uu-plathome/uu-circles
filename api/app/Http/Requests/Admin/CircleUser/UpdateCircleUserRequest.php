<?php


namespace App\Http\Requests\Admin\CircleUser;


use App\Enum\UserModel;
use App\Support\Arr;
use App\ValueObjects\CircleUserValueObject;
use Illuminate\Foundation\Http\FormRequest;

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
            UserModel::username     => ['required', 'string', 'max:30', 'alpha_dash', 'unique:users,username,'.$this->userId],
            UserModel::display_name => ['required', 'string', 'max:50'],
            UserModel::active       => ['required', 'boolean' ],
        ]);
    }

    public function makeCircleUserValueObject(): CircleUserValueObject
    {
        $request = $this->validated();

        return CircleUserValueObject::of([
            'circle_id'             => $this->circleId,
            UserModel::username     => $request['username'],
            UserModel::display_name => $request['displayName'],
            UserModel::active       => $request['active'],
        ]);
    }
}
