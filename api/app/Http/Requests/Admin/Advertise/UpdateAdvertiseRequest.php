<?php

namespace App\Http\Requests\Admin\Advertise;

use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class UpdateAdvertiseRequest extends FormRequest
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
            AdvertiseProperty::publish_from   => __('advertise.' . AdvertiseProperty::publish_from),
            AdvertiseProperty::publish_to     => __('advertise.' . AdvertiseProperty::publish_to),
        ]);
    }

    public function makeAdvertise(): Advertise
    {
        $request = Arr::snake_keys($this->validated());

        return (new Advertise())->fill([
            AdvertiseProperty::title          => $request[AdvertiseProperty::title],
            AdvertiseProperty::link           => $request[AdvertiseProperty::link],
            AdvertiseProperty::main_image_url => $request[AdvertiseProperty::main_image_url],
            AdvertiseProperty::active         => $request[AdvertiseProperty::active],
            AdvertiseProperty::publish_to     => $request[AdvertiseProperty::publish_to] ? new Carbon($request[AdvertiseProperty::publish_to]) : null,
            AdvertiseProperty::publish_from   => $request[AdvertiseProperty::publish_from] ? new Carbon($request[AdvertiseProperty::publish_from]) : null,
        ]);
    }
}
