<?php

namespace Tests\Feature\App\Http\Controllers\Circle\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Enum\Property\UserProperty;
use App\Enum\Role;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class ShowCircleUserControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("ShowCircleUserControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_管理者は自分自身の情報を取得できる()
    {
        Log::info("testRequest_管理者は自分自身の情報を取得できる");

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
        $response = $this->get("/circle/api/circle/{$circleUser->circle_id}/user/{$user->id}", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }

    public function testRequest_一般ユーザーは自分自身の情報を取得できない()
    {
        Log::info("testRequest_一般ユーザーは自分自身の情報を取得できない");

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
        $response = $this->get("/circle/api/circle/{$circleUser->circle_id}/user/{$user->id}", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertStatus(403);
    }
}
