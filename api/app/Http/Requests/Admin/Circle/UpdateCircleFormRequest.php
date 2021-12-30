<?php

namespace App\Http\Requests\Admin\Circle;

use App\Enum\CircleType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleInformationProperty;
use App\Enum\Property\CircleProperty;
use App\Rules\SmallAlphaNum;
use App\Support\Arr;
use App\UseCases\AdminManagement\Circle\Param\UpdateCircleForSystemUsecaseParam;
use App\UseCases\AdminManagement\Circle\Param\UpdateCircleUsecaseParam;
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
                'unique:circles,slug,'.$this->circleId.'id',
                new SmallAlphaNum(),
                Rule::notIn(['newjoy']),
            ],
            CircleProperty::release                               => ['required', 'boolean'],
            CircleProperty::is_main_fixed                         => ['nullable', 'boolean'],
            CircleProperty::is_only_demo                          => ['nullable', 'boolean'],
            CircleProperty::is_demo_fixed                         => ['nullable', 'boolean'],
            CircleProperty::demo_priority                         => ['nullable', 'integer', 'min:0'],
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

    public function makeUpdateCircleUsecaseParam(): UpdateCircleUsecaseParam
    {
        $param = new UpdateCircleUsecaseParam();
        $request = Arr::snake_keys($this->validated());

        $param->circle_id = $this->circleId;
        $param->slug = Arr::get($request, CircleProperty::slug);
        $param->release = Arr::get($request, CircleProperty::release);
        $param->name = Arr::get($request, CircleProperty::name);

        $param->circle_type = Arr::get($request, CircleInformationProperty::circle_type);
        $param->name_kana = Arr::get($request, CircleInformationProperty::name_kana);
        $param->short_name = Arr::get($request, CircleInformationProperty::short_name);
        $param->prefix_name = Arr::get($request, CircleInformationProperty::prefix_name);
        $param->description = Arr::get($request, CircleInformationProperty::description);
        $param->common_place_of_activity = Arr::get($request, CircleInformationProperty::common_place_of_activity);
        $param->common_place_of_activity_detail = Arr::get($request, CircleInformationProperty::common_place_of_activity_detail);
        $param->common_date_of_activity_monday = Arr::get($request, CircleInformationProperty::common_date_of_activity_monday);
        $param->common_date_of_activity_tuesday = Arr::get($request, CircleInformationProperty::common_date_of_activity_tuesday);
        $param->common_date_of_activity_wednesday = Arr::get($request, CircleInformationProperty::common_date_of_activity_wednesday);
        $param->common_date_of_activity_thursday = Arr::get($request, CircleInformationProperty::common_date_of_activity_thursday);
        $param->common_date_of_activity_friday = Arr::get($request, CircleInformationProperty::common_date_of_activity_friday);
        $param->common_date_of_activity_saturday = Arr::get($request, CircleInformationProperty::common_date_of_activity_saturday);
        $param->common_date_of_activity_sunday = Arr::get($request, CircleInformationProperty::common_date_of_activity_sunday);
        $param->common_date_of_activity_detail = Arr::get($request, CircleInformationProperty::common_date_of_activity_detail);
        $param->is_online_activity = Arr::get($request, CircleInformationProperty::is_online_activity);
        $param->online_place_of_activity_detail = Arr::get($request, CircleInformationProperty::online_place_of_activity_detail);
        $param->online_date_of_activity_monday = Arr::get($request, CircleInformationProperty::online_date_of_activity_monday);
        $param->online_date_of_activity_tuesday = Arr::get($request, CircleInformationProperty::online_date_of_activity_tuesday);
        $param->online_date_of_activity_wednesday = Arr::get($request, CircleInformationProperty::online_date_of_activity_wednesday);
        $param->online_date_of_activity_thursday = Arr::get($request, CircleInformationProperty::online_date_of_activity_thursday);
        $param->online_date_of_activity_friday = Arr::get($request, CircleInformationProperty::online_date_of_activity_friday);
        $param->online_date_of_activity_saturday = Arr::get($request, CircleInformationProperty::online_date_of_activity_saturday);
        $param->online_date_of_activity_sunday = Arr::get($request, CircleInformationProperty::online_date_of_activity_sunday);
        $param->online_date_of_activity_detail = Arr::get($request, CircleInformationProperty::online_date_of_activity_detail);
        $param->is_club_activities = Arr::get($request, CircleInformationProperty::is_club_activities);
        $param->appealing_point1 = Arr::get($request, CircleInformationProperty::appealing_point1);
        $param->appealing_point2 = Arr::get($request, CircleInformationProperty::appealing_point2);
        $param->appealing_point3 = Arr::get($request, CircleInformationProperty::appealing_point3);
        $param->admission_fee_per_year = Arr::get($request, CircleInformationProperty::admission_fee_per_year);
        $param->number_of_members = Arr::get($request, CircleInformationProperty::number_of_members);
        $param->public_email = Arr::get($request, CircleInformationProperty::public_email);
        $param->twitter_url = Arr::get($request, CircleInformationProperty::twitter_url);
        $param->facebook_url = Arr::get($request, CircleInformationProperty::facebook_url);
        $param->instagram_url = Arr::get($request, CircleInformationProperty::instagram_url);
        $param->line_url = Arr::get($request, CircleInformationProperty::line_url);
        $param->youtube_url = Arr::get($request, CircleInformationProperty::youtube_url);
        $param->homepage_url = Arr::get($request, CircleInformationProperty::homepage_url);
        $param->peing_url = Arr::get($request, CircleInformationProperty::peing_url);
        $param->github_url = Arr::get($request, CircleInformationProperty::github_url);
        $param->tiktok_url = Arr::get($request, CircleInformationProperty::tiktok_url);
        $param->participation_url = Arr::get($request, CircleInformationProperty::participation_url);
        $param->main_image_url = Arr::get($request, CircleInformationProperty::main_image_url);
        $param->activity_image_url1 = Arr::get($request, CircleInformationProperty::activity_image_url1);
        $param->activity_image_url2 = Arr::get($request, CircleInformationProperty::activity_image_url2);
        $param->activity_image_url3 = Arr::get($request, CircleInformationProperty::activity_image_url3);
        $param->activity_image_url4 = Arr::get($request, CircleInformationProperty::activity_image_url4);
        $param->activity_image_url5 = Arr::get($request, CircleInformationProperty::activity_image_url5);
        $param->activity_image_url6 = Arr::get($request, CircleInformationProperty::activity_image_url6);
        $param->handbill_image_url = Arr::get($request, 'handbill_image_url');

        return $param;
    }

    public function makeUpdateCircleForSystemUsecaseParam(): UpdateCircleForSystemUsecaseParam
    {
        $param = new UpdateCircleForSystemUsecaseParam();
        $request = Arr::snake_keys($this->validated());

        $param->circle_id = $this->circleId;
        $param->slug = Arr::get($request, CircleProperty::slug);
        $param->release = Arr::get($request, CircleProperty::release);
        $param->name = Arr::get($request, CircleProperty::name);
        $param->is_main_fixed = Arr::get($request, CircleProperty::is_main_fixed);
        $param->is_only_demo = Arr::get($request, CircleProperty::is_only_demo);
        $param->is_demo_fixed = Arr::get($request, CircleProperty::is_demo_fixed);
        $param->demo_priority = Arr::get($request, CircleProperty::demo_priority);

        $param->circle_type = Arr::get($request, CircleInformationProperty::circle_type);
        $param->name_kana = Arr::get($request, CircleInformationProperty::name_kana);
        $param->short_name = Arr::get($request, CircleInformationProperty::short_name);
        $param->prefix_name = Arr::get($request, CircleInformationProperty::prefix_name);
        $param->description = Arr::get($request, CircleInformationProperty::description);
        $param->common_place_of_activity = Arr::get($request, CircleInformationProperty::common_place_of_activity);
        $param->common_place_of_activity_detail = Arr::get($request, CircleInformationProperty::common_place_of_activity_detail);
        $param->common_date_of_activity_monday = Arr::get($request, CircleInformationProperty::common_date_of_activity_monday);
        $param->common_date_of_activity_tuesday = Arr::get($request, CircleInformationProperty::common_date_of_activity_tuesday);
        $param->common_date_of_activity_wednesday = Arr::get($request, CircleInformationProperty::common_date_of_activity_wednesday);
        $param->common_date_of_activity_thursday = Arr::get($request, CircleInformationProperty::common_date_of_activity_thursday);
        $param->common_date_of_activity_friday = Arr::get($request, CircleInformationProperty::common_date_of_activity_friday);
        $param->common_date_of_activity_saturday = Arr::get($request, CircleInformationProperty::common_date_of_activity_saturday);
        $param->common_date_of_activity_sunday = Arr::get($request, CircleInformationProperty::common_date_of_activity_sunday);
        $param->common_date_of_activity_detail = Arr::get($request, CircleInformationProperty::common_date_of_activity_detail);
        $param->is_online_activity = Arr::get($request, CircleInformationProperty::is_online_activity);
        $param->online_place_of_activity_detail = Arr::get($request, CircleInformationProperty::online_place_of_activity_detail);
        $param->online_date_of_activity_monday = Arr::get($request, CircleInformationProperty::online_date_of_activity_monday);
        $param->online_date_of_activity_tuesday = Arr::get($request, CircleInformationProperty::online_date_of_activity_tuesday);
        $param->online_date_of_activity_wednesday = Arr::get($request, CircleInformationProperty::online_date_of_activity_wednesday);
        $param->online_date_of_activity_thursday = Arr::get($request, CircleInformationProperty::online_date_of_activity_thursday);
        $param->online_date_of_activity_friday = Arr::get($request, CircleInformationProperty::online_date_of_activity_friday);
        $param->online_date_of_activity_saturday = Arr::get($request, CircleInformationProperty::online_date_of_activity_saturday);
        $param->online_date_of_activity_sunday = Arr::get($request, CircleInformationProperty::online_date_of_activity_sunday);
        $param->online_date_of_activity_detail = Arr::get($request, CircleInformationProperty::online_date_of_activity_detail);
        $param->is_club_activities = Arr::get($request, CircleInformationProperty::is_club_activities);
        $param->appealing_point1 = Arr::get($request, CircleInformationProperty::appealing_point1);
        $param->appealing_point2 = Arr::get($request, CircleInformationProperty::appealing_point2);
        $param->appealing_point3 = Arr::get($request, CircleInformationProperty::appealing_point3);
        $param->admission_fee_per_year = Arr::get($request, CircleInformationProperty::admission_fee_per_year);
        $param->number_of_members = Arr::get($request, CircleInformationProperty::number_of_members);
        $param->public_email = Arr::get($request, CircleInformationProperty::public_email);
        $param->twitter_url = Arr::get($request, CircleInformationProperty::twitter_url);
        $param->facebook_url = Arr::get($request, CircleInformationProperty::facebook_url);
        $param->instagram_url = Arr::get($request, CircleInformationProperty::instagram_url);
        $param->line_url = Arr::get($request, CircleInformationProperty::line_url);
        $param->youtube_url = Arr::get($request, CircleInformationProperty::youtube_url);
        $param->homepage_url = Arr::get($request, CircleInformationProperty::homepage_url);
        $param->peing_url = Arr::get($request, CircleInformationProperty::peing_url);
        $param->github_url = Arr::get($request, CircleInformationProperty::github_url);
        $param->tiktok_url = Arr::get($request, CircleInformationProperty::tiktok_url);
        $param->participation_url = Arr::get($request, CircleInformationProperty::participation_url);
        $param->main_image_url = Arr::get($request, CircleInformationProperty::main_image_url);
        $param->activity_image_url1 = Arr::get($request, CircleInformationProperty::activity_image_url1);
        $param->activity_image_url2 = Arr::get($request, CircleInformationProperty::activity_image_url2);
        $param->activity_image_url3 = Arr::get($request, CircleInformationProperty::activity_image_url3);
        $param->activity_image_url4 = Arr::get($request, CircleInformationProperty::activity_image_url4);
        $param->activity_image_url5 = Arr::get($request, CircleInformationProperty::activity_image_url5);
        $param->activity_image_url6 = Arr::get($request, CircleInformationProperty::activity_image_url6);
        $param->wp_url = Arr::get($request, CircleInformationProperty::wp_url);
        $param->is_view_wp_post = Arr::get($request, CircleInformationProperty::is_view_wp_post);
        $param->wp_tag_taxonomy = Arr::get($request, CircleInformationProperty::wp_tag_taxonomy);
        $param->handbill_image_url = Arr::get($request, 'handbill_image_url');

        return $param;
    }
}
