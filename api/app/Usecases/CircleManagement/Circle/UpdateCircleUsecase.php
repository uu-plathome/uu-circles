<?php

declare(strict_types=1);

namespace App\Usecases\CircleManagement\Circle;

use App\Enum\Property\CircleInformationProperty as CIP;
use App\Enum\Property\CircleProperty;
use App\Models\Circle;
use App\Models\CircleHandbill;
use App\Usecases\CircleManagement\Circle\Params\UpdateCircleUsecaseParam;
use App\ValueObjects\CircleValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

final class UpdateCircleUsecase
{
    /**
     * invoke
     *
     * @param UpdateCircleUsecaseParam $param
     * @return CircleValueObject
     * @throws Exception
     */
    public function invoke(UpdateCircleUsecaseParam $param): CircleValueObject
    {
        Log::debug('UpdateCircleUsecase args', [
            'UpdateCircleUsecaseParam' => $param,
        ]);

        $circleId = $param->circle_id;

        DB::beginTransaction();
        try {
            /** @var Circle $newCircle */
            $newCircle = Circle::findOrFail($circleId);
            $newCircle->fill(
                $this->getCircleByParam($param)
            )->save();

            $newCircle->circleInformation->fill(
                $this->getCircleInformationByParam($param)
            )->save();

            if ($param->handbill_image_url) {
                $circleHandbill = CircleHandbill::whereCircleId($newCircle->id)->first();

                if ($circleHandbill) {
                    $circleHandbill->update([
                        'image_url' => $param->handbill_image_url,
                    ]);
                } else {
                    CircleHandbill::create([
                        'circle_id' => $newCircle->id,
                        'image_url' => $param->handbill_image_url,
                        'year'      => 2021,
                    ]);
                }
            }

            DB::commit();

            return CircleValueObject::byEloquent(
                $newCircle,
                $newCircle->circleInformation,
                $newCircle->circleHandbill
            );
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function getCircleByParam(UpdateCircleUsecaseParam $param): array
    {
        return [
            CircleProperty::name => $param->name,
        ];
    }

    protected function getCircleInformationByParam(UpdateCircleUsecaseParam $param): array
    {
        return [
            CIP::circle_type                       => $param->circle_type,
            CIP::name_kana                         => $param->name_kana,
            CIP::short_name                        => $param->short_name,
            CIP::prefix_name                       => $param->prefix_name,
            CIP::description                       => $param->description,
            CIP::common_place_of_activity          => $param->common_place_of_activity,
            CIP::common_place_of_activity_detail   => $param->common_place_of_activity_detail,
            CIP::common_date_of_activity_monday    => $param->common_date_of_activity_monday,
            CIP::common_date_of_activity_tuesday   => $param->common_date_of_activity_tuesday,
            CIP::common_date_of_activity_wednesday => $param->common_date_of_activity_wednesday,
            CIP::common_date_of_activity_thursday  => $param->common_date_of_activity_thursday,
            CIP::common_date_of_activity_friday    => $param->common_date_of_activity_friday,
            CIP::common_date_of_activity_saturday  => $param->common_date_of_activity_saturday,
            CIP::common_date_of_activity_sunday    => $param->common_date_of_activity_sunday,
            CIP::common_date_of_activity_detail    => $param->common_date_of_activity_detail,
            CIP::is_online_activity                => $param->is_online_activity,
            CIP::online_place_of_activity_detail   => $param->online_place_of_activity_detail,
            CIP::online_date_of_activity_monday    => $param->online_date_of_activity_monday,
            CIP::online_date_of_activity_tuesday   => $param->online_date_of_activity_tuesday,
            CIP::online_date_of_activity_wednesday => $param->online_date_of_activity_wednesday,
            CIP::online_date_of_activity_thursday  => $param->online_date_of_activity_thursday,
            CIP::online_date_of_activity_friday    => $param->online_date_of_activity_friday,
            CIP::online_date_of_activity_saturday  => $param->online_date_of_activity_saturday,
            CIP::online_date_of_activity_sunday    => $param->online_date_of_activity_sunday,
            CIP::online_date_of_activity_detail    => $param->online_date_of_activity_detail,
            CIP::is_club_activities                => $param->is_club_activities,
            CIP::appealing_point1                  => $param->appealing_point1,
            CIP::appealing_point2                  => $param->appealing_point2,
            CIP::appealing_point3                  => $param->appealing_point3,
            CIP::admission_fee_per_year            => $param->admission_fee_per_year,
            CIP::number_of_members                 => $param->number_of_members,
            CIP::public_email                      => $param->public_email,
            CIP::twitter_url                       => $param->twitter_url,
            CIP::facebook_url                      => $param->facebook_url,
            CIP::instagram_url                     => $param->instagram_url,
            CIP::line_url                          => $param->line_url,
            CIP::youtube_url                       => $param->youtube_url,
            CIP::homepage_url                      => $param->homepage_url,
            CIP::peing_url                         => $param->peing_url,
            CIP::github_url                        => $param->github_url,
            CIP::tiktok_url                        => $param->tiktok_url,
            CIP::participation_url                 => $param->participation_url,
            CIP::main_image_url                    => $param->main_image_url,
            CIP::activity_image_url1               => $param->activity_image_url1,
            CIP::activity_image_url2               => $param->activity_image_url2,
            CIP::activity_image_url3               => $param->activity_image_url3,
            CIP::activity_image_url4               => $param->activity_image_url4,
            CIP::activity_image_url5               => $param->activity_image_url5,
            CIP::activity_image_url6               => $param->activity_image_url6,
        ];
    }
}
