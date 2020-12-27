<?php

namespace App\Http\Requests\Admin\Circle;

use App\Enum\CircleModel;
use App\Models\Circle;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Foundation\Http\FormRequest;

class CreateCircleFormRequest extends FormRequest
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
            CircleModel::slug    => [ 'nullable', 'string' ],
            CircleModel::release => [ 'required', 'boolean' ],
        ]);
    }

    public function makeCircleValueObject(): CircleValueObject
    {
        return CircleValueObject::byEloquent(new Circle(
            Arr::snake_keys($this->validated())
        ));
    }
}
