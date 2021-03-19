<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("IndexCircleControllerTest");
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
        $user = User::with([
            'circleUsers',
        ])
            ->whereActive(true)
            ->hasByNonDependentSubquery('circleUsers')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // WHEN
        $response = $this->get('/circle/api/circle', [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
    }
}
