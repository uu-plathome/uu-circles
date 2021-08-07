<?php

namespace App\Http\Requests\Main\PagePosition;

use Illuminate\Foundation\Http\FormRequest;

class CreatePagePositionRequest extends FormRequest
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
        return [
            'pageUrl'        => 'required|string|max:255',
            'pagePositionId' => 'required|string|max:255',
        ];
    }
}
