<?php

namespace App\Http\Requests\Admin\CircleTag;

use App\Entity\CircleTagEntity;
use App\Enum\CircleTagModel;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateOrUpdateCircleTagRequest extends FormRequest
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
            'circle_tag'   => 'nullable|array',
            'circle_tag.*' => [
                'string',
                Rule::in([
                    CircleTagModel::SPORT,
                    CircleTagModel::MUSIC,
                    CircleTagModel::CULTURE,
                    CircleTagModel::NATURE,
                    CircleTagModel::VOLUNTEER,
                    CircleTagModel::INTERNATIONAL,
                    CircleTagModel::INCARE,
                    CircleTagModel::LOOSE,
                    CircleTagModel::COMMUNITY,
                    CircleTagModel::PROGRAMMING,
                    CircleTagModel::URGENT_RECRUITMENT,
                    CircleTagModel::MYSTERY,
                ]),
            ],
        ]);
    }

    public function makeCircleTagEntity(): CircleTagEntity
    {
        $request = Arr::snake_keys($this->validated());

        return CircleTagEntity::of($request['circle_tag'] ? $request['circle_tag'] : []);
    }
}
