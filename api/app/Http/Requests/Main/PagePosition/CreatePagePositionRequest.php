<?php

declare(strict_types=1);

namespace App\Http\Requests\Main\PagePosition;

use Illuminate\Foundation\Http\FormRequest;

final class CreatePagePositionRequest extends FormRequest
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
            'pageName'       => 'required|string|alpha_dash|max:255',
            'pagePositionId' => 'required|string|alpha_dash|max:255',
            'screenWidth'    => 'nullable|regex:/^[0-9]+$/i|min:0|max:100000',
            'screenHeight'   => 'nullable|regex:/^[0-9]+$/i|min:0|max:100000',
        ];
    }
}
