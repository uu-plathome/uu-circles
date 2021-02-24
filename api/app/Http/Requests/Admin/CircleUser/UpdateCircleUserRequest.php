<?php


namespace App\Http\Requests\Admin\CircleUser;


use App\Enum\Property\UserProperty;
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
            UserProperty::username     => ['required', 'string', 'max:30', 'alpha_dash', 'unique:users,username,' . $this->userId],
            UserProperty::display_name => ['required', 'string', 'max:50'],
            UserProperty::active       => ['required', 'boolean'],
        ]);
    }

    public function makeCircleUserValueObject(): CircleUserValueObject
    {
        $request = $this->validated();

        return CircleUserValueObject::of([
            'circle_id'             => $this->circleId,
            UserProperty::username     => $request['username'],
            UserProperty::display_name => $request['displayName'],
            UserProperty::active       => $request['active'],
        ]);
    }
}
