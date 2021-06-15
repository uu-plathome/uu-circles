<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Models\Announcement;
use App\Support\Str;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class FixedAdminViewAnnouncementControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('FixedAdminViewAnnouncementControllerTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_管理者画面で固定表示用のお知らせが取得できる()
    {
        Log::info('testRequest_管理者画面で固定表示用のお知らせが取得できる');

        // GIVEN
        // お知らせの全削除
        Announcement::query()->delete();

        // 管理者画面で固定表示用のお知らせ
        /** @var Announcement $announcement */
        $announcement = Announcement::factory()
            ->count(1)
            ->create([
                AnnouncementProperty::for_admin_view      => true,
                AnnouncementProperty::is_admin_view_fixed => true,
            ])
            ->first();

        // WHEN
        $response = $this->get('/admin/api/announcement/fixed', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);

        $data = $response['data'];
        $this->assertArrayHasKey(AnnouncementProperty::id, $data);
        $this->assertSame($announcement->id, $data['id']);

        $this->assertArrayHasKey(AnnouncementProperty::title, $data);
        $this->assertSame($announcement->title, $data['title']);

        $this->assertArrayHasKey(Str::camel(AnnouncementProperty::for_admin_view), $data);
        $this->assertSame(
            $announcement->for_admin_view,
            $data[Str::camel(AnnouncementProperty::for_admin_view)]
        );

        $this->assertArrayHasKey(Str::camel(AnnouncementProperty::is_admin_view_fixed), $data);
        $this->assertSame(
            $announcement->is_admin_view_fixed,
            $data[Str::camel(AnnouncementProperty::is_admin_view_fixed)]
        );
    }

    public function testRequest_管理者画面で固定表示用のお知らせがない場合は取得できない()
    {
        Log::info('testRequest_管理者画面で固定表示用のお知らせがない場合は取得できない');

        // GIVEN
        // お知らせの全削除
        Announcement::query()->delete();

        // 管理者画面用で固定表示でない
        Announcement::factory()
            ->count(1)
            ->create([
                AnnouncementProperty::for_admin_view      => true,
                AnnouncementProperty::is_admin_view_fixed => false,
            ])
            ->first();

        // サークル管理画面用とメイン画面
        Announcement::factory()
            ->count(1)
            ->create([
                AnnouncementProperty::for_admin_view        => false,
                AnnouncementProperty::is_admin_view_fixed   => false,
                AnnouncementProperty::for_main_view         => true,
                AnnouncementProperty::is_main_view_fixed    => true,
                AnnouncementProperty::is_circle_view_fixed  => true,
            ])
            ->first();

        // WHEN
        $response = $this->get('/admin/api/announcement/fixed', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();

        Log::debug('[THEN] testRequest_管理者画面で固定表示用のお知らせがない場合は取得できない', [
            'response' => $response,
            'data'     => $response['data'],
        ]);

        $data = $response['data'];
        $this->assertNull($data);
    }
}
