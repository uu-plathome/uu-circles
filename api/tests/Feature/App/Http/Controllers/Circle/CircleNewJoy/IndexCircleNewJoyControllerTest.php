<?php

namespace Tests\Feature\App\Http\Controllers\Circle\CircleNewJoy;

use App\Enum\Property\UserProperty;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("IndexCircleNewJoyControllerTest");
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
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
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

        // WHEN
        $response = $this->get("/circle/api/circle/{$circleUser->circle_id}/newjoy", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
    }
}
