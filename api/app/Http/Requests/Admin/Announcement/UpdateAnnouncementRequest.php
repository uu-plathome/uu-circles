<?php

namespace App\Http\Requests\Admin\Announcement;

use App\Enum\AnnouncementType;
use App\Enum\Property\AnnouncementProperty;
use App\Support\Arr;
use App\Usecases\Admin\Announcement\Params\CreateAnnouncementUsecaseParam;
use App\Usecases\Admin\Announcement\Params\UpdateAnnouncementUsecaseParam;
use Carbon\Traits\Creator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateAnnouncementRequest extends FormRequest
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

    public function makeUpdateAnnouncementUsecaseParam(): UpdateAnnouncementUsecaseParam
    {
        $request = Arr::snake_keys($this->validated());

        $param = new UpdateAnnouncementUsecaseParam();
        $param->announcement_id = $this->announcementId;
        $param->title = Arr::get($request, 'title');
        $param->description = Arr::get($request, 'description');
        $param->link = Arr::get($request, 'link');
        $param->announcement_type = Arr::get($request, 'announcement_type');
        $param->importance = Arr::get($request, 'importance');
        $param->for_main_view = Arr::get($request, 'for_main_view', false);
        $param->for_circle_mail = Arr::get($request, 'for_circle_mail', false);
        $param->for_admin_view = Arr::get($request, 'for_admin_view', false);
        $param->for_admin_mail = Arr::get($request, 'for_admin_mail', false);
        $param->for_newjoy_discord = Arr::get($request, 'for_newjoy_discord', false);
        $param->active = Arr::get($request, 'active', true);
        $param->is_main_view_fixed = Arr::get($request, 'is_main_view_fixed', true);
        $param->is_circle_view_fixed = Arr::get($request, 'is_circle_view_fixed', true);
        $param->is_admin_view_fixed = Arr::get($request, 'is_admin_view_fixed', true);

        $notificationTime = Arr::get($request, 'notification_time');
        $param->notification_time = !$notificationTime ? new Carbon($notificationTime) : null;

        $publishFrom = Arr::get($request, 'publish_from');
        $param->publish_from = !$publishFrom ? new Carbon($publishFrom) : null;

        $publishTo = Arr::get($request, 'publish_to');
        $param->publish_to = !$publishTo ? new Carbon($publishTo) : null;

        return $param;
    }
}
