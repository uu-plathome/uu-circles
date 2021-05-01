<?php

namespace App\Http\Requests\Admin\Announcement;

use App\Enum\AnnouncementType;
use App\Enum\Property\AnnouncementProperty;
use App\Support\Arr;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CreateAnnouncementRequest extends FormRequest
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
            AnnouncementProperty::title => [
                'nullable',
                'string',
                'max:100',
            ],
            AnnouncementProperty::description => [
                'nullable',
                'string',
                'max:10000',
            ],
            AnnouncementProperty::link => [
                'nullable',
                'string',
                'url',
                'max:255',
            ],
            AnnouncementProperty::announcement_type => [
                'nullable',
                'string',
                Rule::in(AnnouncementType::getAll()),
            ],
            AnnouncementProperty::for_main_view => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::for_circle_view => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::for_circle_mail => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::for_admin_view => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::for_admin_mail => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::for_newjoy_discord => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::active => [
                'required',
                'boolean',
            ],
            AnnouncementProperty::notification_time => [
                'nullable',
                'date',
                'date_format:Y-m-d H:i',
            ],
            AnnouncementProperty::publish_from => [
                'nullable',
                'date',
                'date_format:Y-m-d H:i',
            ],
            AnnouncementProperty::publish_to   => [
                'nullable',
                'date',
                'date_format:Y-m-d H:i',
                'after:' . Str::camel(AnnouncementProperty::publish_from),
            ],
        ]);
    }

    public function attributes()
    {
        return Arr::camel_keys([
            AnnouncementProperty::title => __('announcement.' . AnnouncementProperty::title),
            AnnouncementProperty::description => __('announcement.' . AnnouncementProperty::description),
            AnnouncementProperty::link => __('announcement.' . AnnouncementProperty::link),
            AnnouncementProperty::announcement_type => __('announcement.' . AnnouncementProperty::announcement_type),
            AnnouncementProperty::for_main_view => __('announcement.' . AnnouncementProperty::for_main_view),
            AnnouncementProperty::for_circle_view => __('announcement.' . AnnouncementProperty::for_circle_view),
            AnnouncementProperty::for_circle_mail => __('announcement.' . AnnouncementProperty::for_circle_mail),
            AnnouncementProperty::for_admin_view => __('announcement.' . AnnouncementProperty::for_admin_view),
            AnnouncementProperty::for_admin_mail => __('announcement.' . AnnouncementProperty::for_admin_mail),
            AnnouncementProperty::for_newjoy_discord => __('announcement.' . AnnouncementProperty::for_newjoy_discord),
            AnnouncementProperty::active => __('announcement.' . AnnouncementProperty::active),
            AnnouncementProperty::notification_time => __('announcement.' . AnnouncementProperty::notification_time),
            AnnouncementProperty::publish_from => __('announcement.' . AnnouncementProperty::publish_from),
            AnnouncementProperty::publish_to => __('announcement.' . AnnouncementProperty::publish_to),
        ]);
    }
}
