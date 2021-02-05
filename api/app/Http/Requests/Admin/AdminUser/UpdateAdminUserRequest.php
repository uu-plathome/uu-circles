<?php


namespace App\Http\Requests\Admin\AdminUser;


use App\Enum\UserModel;
use App\Support\Arr;
use App\ValueObjects\AdminUserValueObject;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAdminUserRequest extends FormRequest
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

    public function makeAdminUserValueObject(): AdminUserValueObject
    {
        $request = $this->validated();

        return AdminUserValueObject::of([
            UserModel::username     => $request['username'],
            UserModel::display_name => $request['displayName'],
            UserModel::active       => $request['active'],
        ]);
    }
}
