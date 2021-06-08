<?php

namespace App\Http\Requests\Circle\Circle;

use App\Enum\Property\CircleInformationProperty as CIP;
use App\Enum\Property\CircleProperty;
use App\Enum\CircleType;
use App\Enum\PlaceOfActivity;
use App\Support\Arr;
use App\Usecases\CircleManagement\Circle\Params\UpdateCircleUsecaseParam;
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
            CircleProperty::name            => ['required', 'string', 'max:50'],
            CIP::name_kana                  => ['nullable', 'string', 'max:100'],
            CIP::short_name                 => ['nullable', 'string', 'max:20'],
            CIP::prefix_name                => ['nullable', 'string', 'max:50'],
            CIP::circle_type                => [
                'nullable',
                'string',
                Rule::in(CircleType::getAll())
            ],
            CIP::description                => ['nullable', 'string', 'max:500'],
            CIP::common_place_of_activity          => [
                'nullable',
                'string',
                Rule::in([
                    PlaceOfActivity::MINE,
                    PlaceOfActivity::YOTO,
                    PlaceOfActivity::MINE_AND_YOTO,
                    PlaceOfActivity::OTHER
                ]),
            ],
            CIP::common_place_of_activity_detail   => ['nullable', 'string', 'max:255'],
            CIP::common_date_of_activity_monday    => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_tuesday   => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_wednesday => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_thursday  => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_friday    => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_saturday  => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_sunday    => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_detail    => ['nullable', 'string', 'max:255'],
            CIP::is_online_activity                => ['nullable', 'boolean'],
            CIP::online_place_of_activity_detail   => ['nullable', 'string', 'max:255'],
            CIP::online_date_of_activity_monday    => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_tuesday   => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_wednesday => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_thursday  => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_friday    => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_saturday  => [
                'nullable',
                'boolean',
            ],
            CIP::online_date_of_activity_sunday    => [
                'nullable',
                'boolean',
            ],
            CIP::common_date_of_activity_detail    => ['nullable', 'string', 'max:255'],
            CIP::admission_fee_per_year              => ['nullable', 'integer', 'max:10000000'],
            CIP::number_of_members          => ['nullable', 'integer', 'max:10000'],
            CIP::is_club_activities  => ['nullable', 'boolean'],
            CIP::appealing_point1    => ['nullable', 'string', 'max:50'],
            CIP::appealing_point2    => ['nullable', 'string', 'max:50'],
            CIP::appealing_point3    => ['nullable', 'string', 'max:50'],
            CIP::public_email        => ['nullable', 'string', 'email', 'max:255'],
            CIP::twitter_url         => ['nullable', 'string', 'url', 'max:255'],
            CIP::facebook_url        => ['nullable', 'string', 'url', 'max:255'],
            CIP::instagram_url       => ['nullable', 'string', 'url', 'max:255'],
            CIP::line_url            => ['nullable', 'string', 'url', 'max:255'],
            CIP::youtube_url         => ['nullable', 'string', 'url', 'max:255'],
            CIP::homepage_url        => ['nullable', 'string', 'url', 'max:255'],
            CIP::peing_url           => ['nullable', 'string', 'url', 'max:255'],
            CIP::github_url          => ['nullable', 'string', 'url', 'max:255'],
            CIP::tiktok_url          => ['nullable', 'string', 'url', 'max:255'],
            CIP::participation_url   => ['nullable', 'string', 'url', 'max:255'],
            CIP::main_image_url      => ['nullable', 'string', 'url', 'max:255'],
            CIP::activity_image_url1 => ['nullable', 'string', 'url', 'max:255'],
            CIP::activity_image_url2 => ['nullable', 'string', 'url', 'max:255'],
            CIP::activity_image_url3 => ['nullable', 'string', 'url', 'max:255'],
            CIP::activity_image_url4 => ['nullable', 'string', 'url', 'max:255'],
            CIP::activity_image_url5 => ['nullable', 'string', 'url', 'max:255'],
            CIP::activity_image_url6 => ['nullable', 'string', 'url', 'max:255'],
            'handbill_image_url'                        => ['nullable', 'string', 'url', 'max:255'],
        ]);
    }

    public function makeUpdateCircleUsecaseParam(): UpdateCircleUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new UpdateCircleUsecaseParam();
        $param->circle_id = $this->circleId;
        $param->name = Arr::get($request, CircleProperty::name);
        $param->circle_type = Arr::get($request, CIP::circle_type);
        $param->name_kana = Arr::get($request, CIP::name_kana);
        $param->short_name = Arr::get($request, CIP::short_name);
        $param->prefix_name = Arr::get($request, CIP::prefix_name);
        $param->description = Arr::get($request, CIP::description);
        $param->common_place_of_activity = Arr::get($request, CIP::common_place_of_activity);
        $param->common_place_of_activity_detail = Arr::get($request, CIP::common_place_of_activity_detail);
        $param->common_date_of_activity_monday = Arr::get($request, CIP::common_date_of_activity_monday);
        $param->common_date_of_activity_tuesday = Arr::get($request, CIP::common_date_of_activity_tuesday);
        $param->common_date_of_activity_wednesday = Arr::get($request, CIP::common_date_of_activity_wednesday);
        $param->common_date_of_activity_thursday = Arr::get($request, CIP::common_date_of_activity_thursday);
        $param->common_date_of_activity_friday = Arr::get($request, CIP::common_date_of_activity_friday);
        $param->common_date_of_activity_saturday = Arr::get($request, CIP::common_date_of_activity_saturday);
        $param->common_date_of_activity_sunday = Arr::get($request, CIP::common_date_of_activity_sunday);
        $param->common_date_of_activity_detail = Arr::get($request, CIP::common_date_of_activity_detail);
        $param->is_online_activity = Arr::get($request, CIP::is_online_activity);
        $param->online_place_of_activity_detail = Arr::get($request, CIP::online_place_of_activity_detail);
        $param->online_date_of_activity_monday = Arr::get($request, CIP::online_date_of_activity_monday);
        $param->online_date_of_activity_tuesday = Arr::get($request, CIP::online_date_of_activity_tuesday);
        $param->online_date_of_activity_wednesday = Arr::get($request, CIP::online_date_of_activity_wednesday);
        $param->online_date_of_activity_thursday = Arr::get($request, CIP::online_date_of_activity_thursday);
        $param->online_date_of_activity_friday = Arr::get($request, CIP::online_date_of_activity_friday);
        $param->online_date_of_activity_saturday = Arr::get($request, CIP::online_date_of_activity_saturday);
        $param->online_date_of_activity_sunday = Arr::get($request, CIP::online_date_of_activity_sunday);
        $param->online_date_of_activity_detail = Arr::get($request, CIP::online_date_of_activity_detail);
        $param->admission_fee_per_year = Arr::get($request, CIP::admission_fee_per_year);
        $param->number_of_members = Arr::get($request, CIP::number_of_members);
        $param->is_club_activities = Arr::get($request, CIP::is_club_activities);
        $param->appealing_point1 = Arr::get($request, CIP::appealing_point1);
        $param->appealing_point2 = Arr::get($request, CIP::appealing_point2);
        $param->appealing_point3 = Arr::get($request, CIP::appealing_point3);
        $param->public_email = Arr::get($request, CIP::public_email);
        $param->twitter_url = Arr::get($request, CIP::twitter_url);
        $param->facebook_url = Arr::get($request, CIP::facebook_url);
        $param->instagram_url = Arr::get($request, CIP::instagram_url);
        $param->line_url = Arr::get($request, CIP::line_url);
        $param->youtube_url = Arr::get($request, CIP::youtube_url);
        $param->homepage_url = Arr::get($request, CIP::homepage_url);
        $param->peing_url = Arr::get($request, CIP::peing_url);
        $param->github_url = Arr::get($request, CIP::github_url);
        $param->tiktok_url = Arr::get($request, CIP::tiktok_url);
        $param->participation_url = Arr::get($request, CIP::participation_url);
        $param->main_image_url = Arr::get($request, CIP::main_image_url);
        $param->activity_image_url1 = Arr::get($request, CIP::activity_image_url1);
        $param->activity_image_url2 = Arr::get($request, CIP::activity_image_url2);
        $param->activity_image_url3 = Arr::get($request, CIP::activity_image_url3);
        $param->activity_image_url4 = Arr::get($request, CIP::activity_image_url4);
        $param->activity_image_url5 = Arr::get($request, CIP::activity_image_url5);
        $param->activity_image_url6 = Arr::get($request, CIP::activity_image_url6);
        $param->handbill_image_url = Arr::get($request, 'handbill_image_url');

        return $param;
    }
}
