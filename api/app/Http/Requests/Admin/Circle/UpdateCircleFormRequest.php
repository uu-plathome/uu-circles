<?php

namespace App\Http\Requests\Admin\Circle;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
use App\Enum\CircleType;
use App\Enum\DateOfActivity;
use App\Enum\PlaceOfActivity;
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
            CircleModel::slug                                  => [
                'required',
                'string',
                'max:50',
                'unique:circles,slug,' . $this->id . 'id',
                new SmallAlphaNum,
                Rule::notIn(['newjoy']),
            ],
            CircleModel::release                               => ['required', 'boolean'],
            CircleModel::name                                  => ['required', 'string', 'max:50'],
            CircleInformationModel::name_kana                  => ['nullable', 'string', 'max:100'],
            CircleInformationModel::short_name                 => ['nullable', 'string', 'max:20'],
            CircleInformationModel::prefix_name                => ['nullable', 'string', 'max:50'],
            CircleInformationModel::circle_type                => [
                'nullable',
                'string',
                Rule::in(CircleType::getAll())
            ],
            CircleInformationModel::description                => ['nullable', 'string', 'max:100'],
            CircleInformationModel::common_place_of_activity          => [
                'nullable',
                'string',
                Rule::in([PlaceOfActivity::MINE, PlaceOfActivity::YOTO, PlaceOfActivity::MINE_AND_YOTO, PlaceOfActivity::OTHER]),
            ],
            CircleInformationModel::common_place_of_activity_detail   => ['nullable', 'string', 'max:255'],
            CircleInformationModel::common_date_of_activity_monday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_tuesday   => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_wednesday => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_thursday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_friday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_saturday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_sunday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_detail    => ['nullable', 'string', 'max:255'],
            CircleInformationModel::is_online_activity                => ['nullable', 'boolean'],
            CircleInformationModel::online_place_of_activity_detail   => ['nullable', 'string', 'max:255'],
            CircleInformationModel::online_date_of_activity_monday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_tuesday   => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_wednesday => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_thursday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_friday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_saturday  => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::online_date_of_activity_sunday    => [
                'nullable',
                'boolean',
            ],
            CircleInformationModel::common_date_of_activity_detail    => ['nullable', 'string', 'max:255'],
            CircleInformationModel::admission_fee_per_year              => ['nullable', 'integer', 'max:10000000'],
            CircleInformationModel::number_of_members          => ['nullable', 'integer', 'max:10000'],
            CircleInformationModel::is_club_activities  => ['nullable', 'boolean'],
            CircleInformationModel::appealing_point1    => ['nullable', 'string', 'max:30'],
            CircleInformationModel::appealing_point2    => ['nullable', 'string', 'max:30'],
            CircleInformationModel::appealing_point3    => ['nullable', 'string', 'max:30'],
            CircleInformationModel::public_email        => ['nullable', 'string', 'email', 'max:255'],
            CircleInformationModel::twitter_url         => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::facebook_url        => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::instagram_url       => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::line_url            => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::youtube_url         => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::homepage_url        => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::peing_url           => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::github_url          => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::tiktok_url          => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::participation_url   => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::main_image_url      => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::activity_image_url1 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::activity_image_url2 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::activity_image_url3 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::activity_image_url4 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::activity_image_url5 => ['nullable', 'string', 'url', 'max:255'],
            CircleInformationModel::activity_image_url6 => ['nullable', 'string', 'url', 'max:255'],
            'handbill_image_url'                        => ['nullable', 'string', 'url', 'max:255'],
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
                'image_url' => Arr::snake_keys($this->validated())['handbill_image_url']
            ])
        );
    }
}
