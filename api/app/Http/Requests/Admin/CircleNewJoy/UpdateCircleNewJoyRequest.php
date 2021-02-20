<?php

namespace App\Http\Requests\Admin\CircleNewJoy;

use App\Enum\CircleNewJoyModel;
use App\Enum\PlaceOfActivity;
use App\Support\Arr;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateCircleNewJoyRequest extends FormRequest
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
            CircleNewJoyModel::title                    => ['required', 'string', 'max:100'],
            CircleNewJoyModel::description              => ['string', 'nullable', 'max:255'],
            CircleNewJoyModel::url                      => ['string', 'nullable', 'url', 'max:255'],
            CircleNewJoyModel::place_of_activity        => [
                'string',
                Rule::in([PlaceOfActivity::DISCORD, PlaceOfActivity::OTHER]),
            ],
            CircleNewJoyModel::place_of_activity_detail => ['string', 'nullable', 'max:255'],
            CircleNewJoyModel::publish_from             => ['date', 'nullable', 'date_format:Y-m-d'],
            CircleNewJoyModel::start_date               => ['date', 'nullable', 'date_format:Y-m-d H:i'],
            CircleNewJoyModel::end_date                 => ['date', 'nullable', 'date_format:Y-m-d H:i', 'after:' . Str::camel('start_date')],
            CircleNewJoyModel::release                  => ['boolean', 'nullable'],
        ]);
    }

    public function makeCircleNewJoyValueObject(): CircleNewJoyValueObject
    {
        $request = Arr::snake_keys($this->validated());

        return CircleNewJoyValueObject::of([
            CircleNewJoyModel::circle_id                => $this->id,
            CircleNewJoyModel::title                    => Arr::get($request, 'title'),
            CircleNewJoyModel::description              => Arr::get($request, 'description'),
            CircleNewJoyModel::url                      => Arr::get($request, 'url'),
            CircleNewJoyModel::place_of_activity        => Arr::get($request, 'place_of_activity'),
            CircleNewJoyModel::place_of_activity_detail => Arr::get($request, 'place_of_activity') === PlaceOfActivity::OTHER ? Arr::get($request, 'place_of_activity_detail') : '',
            CircleNewJoyModel::publish_from             => Arr::get($request, 'publish_from'),
            CircleNewJoyModel::start_date               => Arr::get($request, 'start_date'),
            CircleNewJoyModel::end_date                 => Arr::get($request, 'end_date'),
            CircleNewJoyModel::release                  => Arr::get($request, 'release'),
        ]);
    }
}
