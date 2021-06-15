<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Announcement;

use App\Enum\Property\AnnouncementProperty;
use App\Enum\Property\UserProperty;
use App\Models\Announcement;
use App\Models\User;
use App\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class FixedCircleViewAnnouncementControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('FixedAdminViewAnnouncementControllerTest');
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_サークル管理画面で固定表示用のお知らせが取得できる()
    {
        Log::info('testRequest_サークル管理画面で固定表示用のお知らせが取得できる');

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::with([
            'circleUsers',
        ])
            ->whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                /** @var \App\Models\CircleUser $query */
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    /** @var \App\Models\Circle $query */
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // お知らせの全削除
        Announcement::query()->delete();

        // サークル管理画面で固定表示用のお知らせ
        /** @var Announcement $announcement */
        $announcement = Announcement::factory()
            ->count(1)
            ->create([
                AnnouncementProperty::is_circle_view_fixed => true,
            ])
            ->first();

        // WHEN
        $response = $this->get('/circle/api/announcement/fixed', [
            'Authorization' => "Bearer $user->api_token",
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

    public function testRequest_サークル管理画面で固定表示用のお知らせがない場合は取得できない()
    {
        Log::info('testRequest_サークル管理画面で固定表示用のお知らせがない場合は取得できない');

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::with([
            'circleUsers',
        ])
            ->whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                /** @var \App\Models\CircleUser $query */
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    /** @var \App\Models\Circle $query */
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // お知らせの全削除
        Announcement::query()->delete();
        $this->assertSame(0, Announcement::count());

        // サークル管理画面で固定表示でない
        /** @var Announcement $announcement */
        $announcement = Announcement::factory()
            ->count(1)
            ->create([
                AnnouncementProperty::is_circle_view_fixed => false,
            ])
            ->first();
        $this->assertFalse($announcement->is_circle_view_fixed);

        // 管理画面用とメイン画面
        /** @var Announcement $announcement */
        $announcement = Announcement::factory()
            ->count(1)
            ->create([
                AnnouncementProperty::for_admin_view        => true,
                AnnouncementProperty::is_admin_view_fixed   => true,
                AnnouncementProperty::for_main_view         => true,
                AnnouncementProperty::is_main_view_fixed    => true,
                AnnouncementProperty::is_circle_view_fixed  => false,
            ])
            ->first();
        $this->assertFalse($announcement->is_circle_view_fixed);

        // WHEN
        $response = $this->get('/circle/api/announcement/fixed', [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();

        Log::debug('[THEN] testRequest_サークル管理画面で固定表示用のお知らせがない場合は取得できない', [
            'response' => $response,
            'data'     => $response['data'],
        ]);

        $data = $response['data'];
        $this->assertNull($data);
    }
}
