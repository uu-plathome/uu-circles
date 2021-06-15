<?php

namespace App\Http\Requests\Admin\Circle;

use App\Enum\CircleType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleInformationProperty;
use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Models\CircleInformation;
use App\Rules\SmallAlphaNum;
use App\Support\Arr;
use App\ValueObjects\CircleValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCircleFormRequest extends FormRequest
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
            CircleProperty::slug                                  => [
                'required',
                'string',
                'max:50',
                'unique:circles,slug,'.$this->id.'id',
                new SmallAlphaNum(),
                Rule::notIn(['newjoy']),
            ],
            CircleProperty::release                               => ['required', 'boolean'],
            CircleProperty::is_main_fixed                         => ['nullable', 'boolean'],
            CircleProperty::name                                  => ['required', 'string', 'max:50'],
            CircleInformationProperty::name_kana                  => ['nullable', 'string', 'max:100'],
            CircleInformationProperty::short_name                 => ['nullable', 'string', 'max:20'],
            CircleInformationProperty::prefix_name                => ['nullable', 'string', 'max:50'],
            CircleInformationProperty::circle_type                => [
                'nullable',
                'string',
                Rule::in(CircleType::getAll()),
            ],
            CircleInformationProperty::description                       => ['nullable', 'string', 'max:500'],
            CircleInformationProperty::common_place_of_activity          => [
                'nullable',
                'string',
                Rule::in([
                    PlaceOfActivity::MINE,
                    PlaceOfActivity::YOTO,
                    PlaceOfActivity::MINE_AND_YOTO,
                    PlaceOfActivity::OTHER,
                ]),
            ],
            CircleInformationProperty::common_place_of_activity_detail   => ['nullable', 'string', 'max:255'],
            CircleInformationProperty::common_date_of_activity_monday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_tuesday   => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_wednesday => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_thursday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_friday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_saturday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_sunday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_detail    => ['nullable', 'string', 'max:255'],
            CircleInformationProperty::is_online_activity                => ['nullable', 'boolean'],
            CircleInformationProperty::online_place_of_activity_detail   => ['nullable', 'string', 'max:255'],
            CircleInformationProperty::online_date_of_activity_monday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_tuesday   => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_wednesday => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_thursday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_friday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_saturday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::online_date_of_activity_sunday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationProperty::common_date_of_activity_detail      => ['nullable', 'string', 'max:255'],
            CircleInformationProperty::admission_fee_per_year              => ['nullable', 'integer', 'max:10000000'],
            CircleInformationProperty::number_of_members                   => ['nullable', 'integer', 'max:10000'],
            CircleInformationProperty::is_club_activities                  => ['nullable', 'boolean'],
            CircleInformationProperty::appealing_point1                    => ['nullable', 'string', 'max:50'],
            CircleInformationProperty::appealing_point2                    => ['nullable', 'string', 'max:50'],
            CircleInformationProperty::appealing_point3                    => ['nullable', 'string', 'max:50'],
            CircleInformationProperty::public_email                        => ['nullable', 'string', 'email', 'max:255'],
            CircleInformationProperty::twitter_url                         => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::facebook_url                        => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::instagram_url                       => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::line_url                            => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::youtube_url                         => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::homepage_url                        => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::peing_url                           => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::github_url                          => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::tiktok_url                          => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::participation_url                   => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::main_image_url                      => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::activity_image_url1                 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::activity_image_url2                 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::activity_image_url3                 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::activity_image_url4                 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::activity_image_url5                 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::activity_image_url6                 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::wp_url                              => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationProperty::wp_tag_taxonomy                     => ['nullable', 'string', 'max:100'],
            CircleInformationProperty::is_view_wp_post                     => ['nullable', 'boolean'],
            'handbill_image_url'                                           => ['nullable', 'string', 'url', 'max:255'],
        ]);
    }

    public function makeCircleValueObject(): CircleValueObject
    {
        $circle = new Circle(
            Arr::snake_keys($this->validated())
        );
        $circle->id = $this->id;

        return CircleValueObject::byEloquent(
            $circle,
            new CircleInformation(
                Arr::snake_keys($this->validated())
            ),
            new CircleHandbill([
                'image_url' => Arr::snake_keys($this->validated())['handbill_image_url'],
            ])
        );
    }
}
