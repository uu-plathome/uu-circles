<?php

namespace App\Http\Requests\Admin\CircleTag;

use App\Enum\CircleTagModel;
use App\Support\Arr;
use App\Usecases\AdminManagement\CircleTag\Params\CreateOrUpdateCircleTagUsecaseParam;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateOrUpdateCircleTagRequest extends FormRequest
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
            'circle_tag'   => 'nullable|array',
            'circle_tag.*' => [
                'string',
                Rule::in(self::canSelectedTags()),
            ],
        ]);
    }

    /**
     * 変更可能なタグ.
     *
     * @return array
     */
    public static function canSelectedTags(): array
    {
        return [
            CircleTagModel::SPORT,
            CircleTagModel::MUSIC,
            CircleTagModel::CULTURE,
            CircleTagModel::NATURE,
            CircleTagModel::VOLUNTEER,
            CircleTagModel::INTERNATIONAL,
            CircleTagModel::INCARE,
            CircleTagModel::LOOSE,
            CircleTagModel::COMMUNITY,
            CircleTagModel::PROGRAMMING,
            CircleTagModel::URGENT_RECRUITMENT,
            CircleTagModel::MYSTERY,
        ];
    }

    public function makeCreateOrUpdateCircleTagUsecaseParam(): CreateOrUpdateCircleTagUsecaseParam
    {
        $request = Arr::get(Arr::snake_keys($this->validated()), 'circle_tag', []);

        $param = new CreateOrUpdateCircleTagUsecaseParam();
        $param->circle_id = $this->circleId;
        $param->sport = in_array(CircleTagModel::SPORT, $request, true);
        $param->music = in_array(CircleTagModel::MUSIC, $request, true);
        $param->culture = in_array(CircleTagModel::CULTURE, $request, true);
        $param->volunteer = in_array(CircleTagModel::VOLUNTEER, $request, true);
        $param->nature = in_array(CircleTagModel::NATURE, $request, true);
        $param->international = in_array(CircleTagModel::INTERNATIONAL, $request, true);
        $param->incare = in_array(CircleTagModel::INCARE, $request, true);
        $param->loose = in_array(CircleTagModel::LOOSE, $request, true);
        $param->community = in_array(CircleTagModel::COMMUNITY, $request, true);
        $param->programming = in_array(CircleTagModel::PROGRAMMING, $request, true);
        $param->urgent_recruitment = in_array(CircleTagModel::URGENT_RECRUITMENT, $request, true);
        $param->mystery = in_array(CircleTagModel::MYSTERY, $request, true);

        return $param;
    }
}
