<?php

namespace App\Http\Requests\Admin\Advertise;

use App\Enum\AdvertiseType;
use App\Enum\Property\AdvertiseProperty;
use App\Support\Arr;
use App\Models\Advertise;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CreateAdvertiseRequest extends FormRequest
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
            AdvertiseProperty::title          => 'required|string|max:50',
            AdvertiseProperty::link           => 'nullable|string|max:255|url',
            AdvertiseProperty::main_image_url => 'nullable|string|max:255|url',
            AdvertiseProperty::active         => 'nullable|boolean',
            AdvertiseProperty::advertise_type => [
                'nullable',
                'string',
                Rule::in([AdvertiseType::COMMON, AdvertiseType::MAIN_TOP]),
            ],
            AdvertiseProperty::publish_from   => 'nullable|date|date_format:Y-m-d',
            AdvertiseProperty::publish_to     => 'nullable|date|date_format:Y-m-d|after:publishFrom',
        ]);
    }

    public function attributes()
    {
        return Arr::camel_keys([
            AdvertiseProperty::title          => __('advertise.' . AdvertiseProperty::title),
            AdvertiseProperty::link           => __('advertise.' . AdvertiseProperty::link),
            AdvertiseProperty::main_image_url => __('advertise.' . AdvertiseProperty::main_image_url),
            AdvertiseProperty::active         => __('advertise.' . AdvertiseProperty::active),
            AdvertiseProperty::advertise_type => __('advertise.' . AdvertiseProperty::advertise_type),
            AdvertiseProperty::publish_to     => __('advertise.' . AdvertiseProperty::publish_to),
            AdvertiseProperty::publish_from   => __('advertise.' . AdvertiseProperty::publish_from),
        ]);
    }

    public function makeAdvertise(): Advertise
    {
        $request = Arr::snake_keys($this->validated());

        return (new Advertise())->fill([
            AdvertiseProperty::title          => $request[AdvertiseProperty::title],
            AdvertiseProperty::link           => $request[AdvertiseProperty::link],
            AdvertiseProperty::slug           => Str::uuid(),
            AdvertiseProperty::main_image_url => $request[AdvertiseProperty::main_image_url],
            AdvertiseProperty::active         => $request[AdvertiseProperty::active],
            AdvertiseProperty::advertise_type => $request[AdvertiseProperty::advertise_type],
            AdvertiseProperty::publish_to     => $request[AdvertiseProperty::publish_to] ? new Carbon($request[AdvertiseProperty::publish_to]) : null,
            AdvertiseProperty::publish_from   => $request[AdvertiseProperty::publish_from] ? new Carbon($request[AdvertiseProperty::publish_from]) : null,
        ]);
    }
}
