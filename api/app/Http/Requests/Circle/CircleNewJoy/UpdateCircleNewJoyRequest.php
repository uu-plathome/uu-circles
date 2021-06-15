<?php

namespace App\Http\Requests\Circle\CircleNewJoy;

use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleNewJoyProperty;
use App\Support\Arr;
use App\Usecases\CircleManagement\CircleNewJoy\Params\UpdateCircleNewJoyUsecaseParam;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
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
            CircleNewJoyProperty::private_newjoy_link      => ['string', 'nullable', 'url', 'max:255'],
            CircleNewJoyProperty::place_of_activity        => [
                'required',
                'string',
                Rule::in(PlaceOfActivity::toArrayForCircleNewJoy()),
            ],
            CircleNewJoyProperty::place_of_activity_detail => ['string', 'nullable', 'max:255'],
            CircleNewJoyProperty::publish_from             => ['date', 'nullable', 'date_format:Y-m-d'],
            CircleNewJoyProperty::start_date               => ['required', 'date', 'date_format:Y-m-d H:i'],
            CircleNewJoyProperty::end_date                 => ['date', 'nullable', 'date_format:Y-m-d H:i', 'after:'.Str::camel('start_date')],
            CircleNewJoyProperty::release                  => ['boolean', 'nullable'],
        ]);
    }

    public function attributes()
    {
        return Arr::camel_keys([
            CircleNewJoyProperty::title                    => __('circleNewJoy.'.CircleNewJoyProperty::title),
            CircleNewJoyProperty::description              => __('circleNewJoy.'.CircleNewJoyProperty::description),
            CircleNewJoyProperty::place_of_activity        => __('circleNewJoy.'.CircleNewJoyProperty::place_of_activity),
            CircleNewJoyProperty::place_of_activity_detail => __('circleNewJoy.'.CircleNewJoyProperty::place_of_activity_detail),
            CircleNewJoyProperty::start_date               => __('circleNewJoy.'.CircleNewJoyProperty::start_date),
            CircleNewJoyProperty::end_date                 => __('circleNewJoy.'.CircleNewJoyProperty::end_date),
            CircleNewJoyProperty::url                      => __('circleNewJoy.'.CircleNewJoyProperty::url),
            CircleNewJoyProperty::private_newjoy_link      => __('circleNewJoy.'.CircleNewJoyProperty::private_newjoy_link),
            CircleNewJoyProperty::release                  => __('circleNewJoy.'.CircleNewJoyProperty::release),
            CircleNewJoyProperty::publish_from             => __('circleNewJoy.'.CircleNewJoyProperty::publish_from),
        ]);
    }

    public function makeUpdateCircleNewJoyUsecaseParam(): UpdateCircleNewJoyUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new UpdateCircleNewJoyUsecaseParam();
        $param->circle_id = $this->circleId;
        $param->circle_newjoy_id = $this->circleNewJoyId;
        $param->title = Arr::get($request, 'title');
        $param->description = Arr::get($request, 'description');
        $param->url = Arr::get($request, 'url');
        $param->private_newjoy_link = Arr::get($request, CircleNewJoyProperty::private_newjoy_link);
        $param->place_of_activity = Arr::get($request, CircleNewJoyProperty::place_of_activity);
        $param->place_of_activity_detail = Arr::get($request, CircleNewJoyProperty::place_of_activity) !== PlaceOfActivity::NEWJOY_DISCORD
            ? Arr::get($request, 'place_of_activity_detail')
            : '';
        $param->publish_from = Arr::get($request, 'publish_from') ? new Carbon(Arr::get($request, 'publish_from')) : null;
        $param->start_date = Arr::get($request, 'start_date') ? new Carbon(Arr::get($request, 'start_date')) : null;
        $param->end_date = Arr::get($request, 'end_date') ? new Carbon(Arr::get($request, 'end_date')) : null;
        $param->release = Arr::get($request, 'release');

        return $param;
    }
}
