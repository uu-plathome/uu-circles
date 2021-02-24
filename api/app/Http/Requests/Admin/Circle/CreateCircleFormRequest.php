<?php

namespace App\Http\Requests\Admin\Circle;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
use App\Models\Circle;
use App\Models\CircleInformation;
use App\Rules\SmallAlphaNum;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            CircleModel::slug             => [
                'nullable',
                'string',
                'unique:circles',
                'max:50',
                new SmallAlphaNum,
                Rule::notIn(['newjoy']),
            ],
            CircleModel::release          => ['required', 'boolean'],
            CircleModel::name  => ['required', 'string', 'max:50'],
        ]);
    }

    public function attributes()
    {
        return [
            CircleModel::slug             => __('circle.' . CircleModel::slug),
            CircleModel::release          => __('circle.' . CircleModel::release),
            CircleModel::name             => __('circle.' . CircleModel::name),
        ];
    }

    public function makeCircleValueObject(): CircleValueObject
    {
        return CircleValueObject::byEloquent(
            new Circle(
                Arr::snake_keys($this->validated())
            ),
            new CircleInformation(
                Arr::snake_keys($this->validated())
            ),
            null
        );
    }
}
