<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Auth;

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
            ->hasByNonDependentSubquery('circleUser')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // WHEN
        $response = $this->get("/circle/api/circle/{$user->circleUser->circle_id}/newjoy", [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
    }
}
