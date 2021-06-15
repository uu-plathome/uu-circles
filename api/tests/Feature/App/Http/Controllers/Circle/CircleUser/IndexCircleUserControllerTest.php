<?php

namespace Tests\Feature\App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class IndexCircleUserControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('IndexCircleUserControllerTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_管理者は一覧を取得できる()
    {
        Log::info('testRequest_管理者は一覧を取得できる');

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                /** @var \App\Models\CircleUser $query */
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);
        $circleUser = $user->circleUsers()
            ->hasByNonDependentSubquery('circle', function ($query) {
                $query->whereRelease(true);
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($circleUser);
        $circleUser->update([
            CircleUserProperty::role => Role::MANAGER,
        ]);
        $this->assertSame(Role::MANAGER, $circleUser->role);

        // WHEN
        $response = $this->get("/circle/api/circle/{$circleUser->circle_id}/user", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('circle', $response);
        $this->assertIsArray($response['circle']);
        $this->assertArrayHasKey('circleUsersDoneEmailVerify', $response);
        $this->assertIsArray($response['circleUsersDoneEmailVerify']);
        $this->assertArrayHasKey('circleUsersNotDoneEmailVerify', $response);
        $this->assertIsArray($response['circleUsersNotDoneEmailVerify']);
    }

    public function testRequest_一般ユーザーは一覧を取得できない()
    {
        Log::info('testRequest_一般ユーザーは一覧を取得できない');

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                /** @var \App\Models\CircleUser $query */
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);
        $circleUser = $user->circleUsers()
            ->hasByNonDependentSubquery('circle', function ($query) {
                $query->whereRelease(true);
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($circleUser);
        $circleUser->update([
            CircleUserProperty::role => Role::COMMON,
        ]);
        $this->assertSame(Role::COMMON, $circleUser->role);

        // WHEN
        $response = $this->get("/circle/api/circle/{$circleUser->circle_id}/user", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertStatus(403);
    }
}
