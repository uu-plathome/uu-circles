<?php

namespace App\Http\Requests\Admin\CircleNewJoy;

use App\Enum\CircleNewJoyModel;
use App\Enum\PlaceOfActivity;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterCircleNewJoyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            CircleNewJoyModel::title                    => ['string', 'max:100'],
            CircleNewJoyModel::description              => ['string', 'nullable', 'max:255'],
            CircleNewJoyModel::url                      => ['string', 'nullable', 'url', 'max:255'],
            CircleNewJoyModel::place_of_activity        => [
                'string',
                'nullable',
                Rule::in([PlaceOfActivity::MINE, PlaceOfActivity::YOTO, PlaceOfActivity::MINE_AND_YOTO, PlaceOfActivity::OTHER]),
            ],
            CircleNewJoyModel::place_of_activity_detail => ['string', 'nullable', 'max:255'],
            CircleNewJoyModel::publish_from             => ['string', 'nullable'],
            CircleNewJoyModel::publish_to               => ['string', 'nullable'],
            CircleNewJoyModel::start_date               => ['string', 'nullable'],
            CircleNewJoyModel::end_date                 => ['string', 'nullable'],
            CircleNewJoyModel::release                  => ['boolean', 'nullable'],
        ];
    }

    public function makeCircleNewJoyValueObject(): CircleNewJoyValueObject
    {
        return CircleNewJoyValueObject::of([
            CircleNewJoyModel::title                    => $this->title,
            CircleNewJoyModel::description              => $this->description,
            CircleNewJoyModel::url                      => $this->url,
            CircleNewJoyModel::place_of_activity        => $this->place_of_activity,
            CircleNewJoyModel::place_of_activity_detail => $this->place_of_activity_detail,
            CircleNewJoyModel::publish_from             => $this->publish_from,
            CircleNewJoyModel::publish_to               => $this->publish_to,
            CircleNewJoyModel::start_date               => $this->start_date,
            CircleNewJoyModel::end_date                 => $this->end_date,
            CircleNewJoyModel::release                  => $this->release,
        ]);
    }
}
