<?php

namespace App\Http\Requests\Admin\DemoCircleNewJoy;

use App\Enum\DemoCircleNewjoyType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleNewJoyProperty;
use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Support\Arr;
use App\UseCases\AdminManagement\DemoCircleNewJoy\Params\CreateDemoCircleNewJoyUsecaseParam;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RegisterDemoCircleNewJoyRequest extends FormRequest
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
            DemoCircleNewJoyProperty::title                    => ['required', 'string', 'max:30'],
            DemoCircleNewJoyProperty::description              => ['string', 'nullable', 'max:150'],
            DemoCircleNewJoyProperty::url                      => ['string', 'nullable', 'url', 'max:255'],
            DemoCircleNewJoyProperty::place_of_activity        => [
                'required',
                'string',
                Rule::in(PlaceOfActivity::toArrayForCircleNewJoy()),
            ],
            DemoCircleNewJoyProperty::place_of_activity_detail => ['string', 'nullable', 'max:100'],
            DemoCircleNewJoyProperty::demo_circle_newjoy_type  => [
                'string',
                'required',
                Rule::in([
                    DemoCircleNewjoyType::FUTURE,
                    DemoCircleNewjoyType::NOW,
                    DemoCircleNewjoyType::TODAY,
                ]),
            ],
            DemoCircleNewJoyProperty::start_date               => ['required', 'date', 'date_format:Y-m-d H:i'],
            DemoCircleNewJoyProperty::end_date                 => ['date', 'nullable', 'date_format:Y-m-d H:i', 'after:' . Str::camel('start_date')],
            DemoCircleNewJoyProperty::published                => ['boolean', 'nullable'],
        ]);
    }

    public function attributes()
    {
        return Arr::camel_keys([
            DemoCircleNewJoyProperty::title                    => __('circleNewJoy.' . CircleNewJoyProperty::title),
            DemoCircleNewJoyProperty::description              => __('circleNewJoy.' . CircleNewJoyProperty::description),
            DemoCircleNewJoyProperty::place_of_activity        => __('circleNewJoy.' . CircleNewJoyProperty::place_of_activity),
            DemoCircleNewJoyProperty::place_of_activity_detail => __('circleNewJoy.' . CircleNewJoyProperty::place_of_activity_detail),
            DemoCircleNewJoyProperty::start_date               => __('circleNewJoy.' . CircleNewJoyProperty::start_date),
            DemoCircleNewJoyProperty::end_date                 => __('circleNewJoy.' . CircleNewJoyProperty::end_date),
            DemoCircleNewJoyProperty::url                      => __('circleNewJoy.' . CircleNewJoyProperty::url),
            DemoCircleNewJoyProperty::published                => __('circleNewJoy.' . CircleNewJoyProperty::release),
        ]);
    }

    public function makeCreateDemoCircleNewJoyUsecaseParam(): CreateDemoCircleNewJoyUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new CreateDemoCircleNewJoyUsecaseParam();
        $param->circle_id = $this->circleId;
        $param->title = Arr::get($request, 'title');
        $param->demo_circle_newjoy_type = Arr::get($request, 'demo_circle_newjoy_type');
        $param->description = Arr::get($request, 'description');
        $param->url = Arr::get($request, 'url');
        $param->place_of_activity = Arr::get($request, 'place_of_activity');
        $param->place_of_activity_detail = Arr::get($request, CircleNewJoyProperty::place_of_activity) !== PlaceOfActivity::NEWJOY_DISCORD
            ? Arr::get($request, 'place_of_activity_detail') : '';
        $param->start_date = Arr::get($request, 'start_date') ? new Carbon(Arr::get($request, 'start_date')) : null;
        $param->end_date = Arr::get($request, 'end_date') ? new Carbon(Arr::get($request, 'end_date')) : null;
        $param->published = Arr::get($request, 'published');

        return $param;
    }
}
