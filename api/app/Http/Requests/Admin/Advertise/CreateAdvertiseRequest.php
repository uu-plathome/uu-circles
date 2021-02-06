<?php

namespace App\Http\Requests\Admin\Advertise;

use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;

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
            'title'          => 'required|string|max:255',
            'main_image_url' => 'nullable|string|max:255',
            'active'         => 'nullable|boolean',
            'publish_to'     => 'nullable|date',
            'publish_from'   => 'nullable|date',
        ]);
    }

    public function makeAdvertise(): Advertise
    {
        $request = Arr::snake_keys($this->validated());

        return Advertise::fill([
            'title'          => $request['title'],
            'main_image_url' => $request['main_image_url'],
            'active'         => $request['active'],
            'publish_to'     => $request['publish_to'],
            'publish_from'   => $request['publish_from'],
        ]);
    }
}
