<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Models\Announcement;
use App\Support\Arr;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class CreateAnnouncementControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("CreateAnnouncementControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info("testRequest");

        // GIVEN
        /** @var Announcement $announcement */
        $announcement = Announcement::factory()->count(1)->make()->first();
        $count = Announcement::count();

        // WHEN
        $response = $this->postJson(
            "/admin/api/announcement",
            Arr::camel_keys([
                AnnouncementProperty::title                => $announcement->title,
                AnnouncementProperty::description          => $announcement->description,
                AnnouncementProperty::link                 => $announcement->link,
                AnnouncementProperty::announcement_type    => $announcement->announcement_type,
                AnnouncementProperty::importance           => $announcement->importance,
                AnnouncementProperty::for_main_view        => $announcement->for_main_view,
                AnnouncementProperty::for_circle_mail      => $announcement->for_circle_mail,
                AnnouncementProperty::for_admin_view       => $announcement->for_admin_view,
                AnnouncementProperty::for_admin_mail       => $announcement->for_admin_mail,
                AnnouncementProperty::for_newjoy_discord   => $announcement->for_newjoy_discord,
                AnnouncementProperty::active               => $announcement->active,
                AnnouncementProperty::is_admin_view_fixed  => $announcement->is_admin_view_fixed,
                AnnouncementProperty::is_circle_view_fixed => $announcement->is_circle_view_fixed,
                AnnouncementProperty::is_main_view_fixed   => $announcement->is_main_view_fixed,
                AnnouncementProperty::notification_time    => $announcement->notification_time,
                AnnouncementProperty::publish_from         => $announcement->publish_from,
                AnnouncementProperty::publish_to           => $announcement->publish_to,
            ]),
            [
                'Authorization' => 'Bearer test1234',
            ]
        );

        // THEN
        $response->assertOk();
        $this->assertSame($count + 1, Announcement::count());
    }
}
