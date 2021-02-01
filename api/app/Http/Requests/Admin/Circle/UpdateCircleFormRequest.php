<?php

namespace App\Http\Requests\Admin\Circle;

use App\Enum\CircleInformationModel;
use App\Enum\CircleModel;
use App\Enum\CircleType;
use App\Enum\DateOfActivity;
use App\Enum\PlaceOfActivity;
use App\Models\Circle;
use App\Models\CircleInformation;
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
                'unique:circles,slug,'.$this->id.'id'
            ],
            CircleModel::release                               => [ 'required', 'boolean' ],
            CircleInformationModel::name                       => [ 'required', 'string', 'max:255' ],
            CircleInformationModel::name_kana                  => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::short_name                 => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::prefix_name                => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::circle_type                => [
                'nullable',
                'string',
                Rule::in(CircleType::getAll())
            ],
            CircleInformationModel::description                => [ 'nullable', 'string', 'max:100' ],
            CircleInformationModel::intro                      => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::place_of_activity          => [
                'nullable',
                'string',
                Rule::in([PlaceOfActivity::MINE, PlaceOfActivity::YOTO, PlaceOfActivity::MINE_AND_YOTO, PlaceOfActivity::OTHER]),
            ],
            CircleInformationModel::place_of_activity_detail   => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::do_online_activity         => [ 'nullable', 'boolean' ],
            CircleInformationModel::date_of_activity_monday    => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_tuesday   => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_wednesday => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_thursday  => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_friday    => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_saturday  => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_sunday    => [
                'nullable',
                'string',
                Rule::in(DateOfActivity::getAll()),
            ],
            CircleInformationModel::date_of_activity_detail    => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::admission_fee              => [ 'nullable', 'string', 'max:255' ],
            CircleInformationModel::number_of_members          => [ 'nullable', 'integer', 'max:10000' ],
            CircleInformationModel::public_email      => [ 'nullable', 'string', 'email', 'max:255' ],
            CircleInformationModel::twitter_url       => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::facebook_url      => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::instagram_url     => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::line_url          => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::youtube_url       => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::homepage_url      => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::peing_url         => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::github_url        => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::tiktok_url        => [ 'nullable', 'string', 'url', 'max:255' ],
            CircleInformationModel::participation_url => [ 'nullable', 'string', 'url', 'max:255' ],
            'main_image_url'                          => [ 'nullable', 'string', 'url', 'max:255' ],
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
            )
        );
    }
}
