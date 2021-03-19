<?php

namespace App\Http\Requests\Circle\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Enum\PlaceOfActivity;
use App\Support\Arr;
use App\Usecases\CircleManagement\CircleNewJoy\UpdateCircleNewJoyUsecaseParam;
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
            CircleNewJoyProperty::title                    => ['required', 'string', 'max:30'],
            CircleNewJoyProperty::description              => ['string', 'nullable', 'max:150'],
            CircleNewJoyProperty::url                      => ['string', 'nullable', 'url', 'max:255'],
            CircleNewJoyProperty::place_of_activity        => [
                'string',
                Rule::in([PlaceOfActivity::DISCORD, PlaceOfActivity::OTHER]),
            ],
            CircleNewJoyProperty::place_of_activity_detail => ['string', 'nullable', 'max:255'],
            CircleNewJoyProperty::publish_from             => ['date', 'nullable', 'date_format:Y-m-d'],
            CircleNewJoyProperty::start_date               => ['required', 'date', 'date_format:Y-m-d H:i'],
            CircleNewJoyProperty::end_date                 => ['date', 'nullable', 'date_format:Y-m-d H:i', 'after:' . Str::camel('start_date')],
            CircleNewJoyProperty::release                  => ['boolean', 'nullable'],
        ]);
    }

    public function makeUpdateCircleNewJoyUsecaseParam(): UpdateCircleNewJoyUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new UpdateCircleNewJoyUsecaseParam();
        $param->circle_id = $this->circleId;
        $param->circle_newjoy_id = $this->circleNewjoyId;
        $param->title = Arr::get($request, 'title');
        $param->description = Arr::get($request, 'description');
        $param->url = Arr::get($request, 'url');
        $param->place_of_activity = Arr::get($request, 'place_of_activity');
        $param->place_of_activity = Arr::get($request, 'place_of_activity') === PlaceOfActivity::OTHER ? Arr::get($request, 'place_of_activity_detail') : '';
        $param->publish_from = Arr::get($request, 'publish_from') ? new Carbon(Arr::get($request, 'publish_from')) : null;
        $param->start_date = Arr::get($request, 'start_date') ? new Carbon(Arr::get($request, 'start_date')) : null;
        $param->end_date = Arr::get($request, 'end_date') ? new Carbon(Arr::get($request, 'end_date')) : null;
        $param->release = Arr::get($request, 'release');

        return $param;
    }
}
