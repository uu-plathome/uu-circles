<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Models\Circle;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class GetCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("GetCircleControllerTest");
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
        $circle = Circle::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        // WHEN
        $response = $this->get("/api/circle/{$circle->slug}");

        // THEN
        $response->assertOk();
    }
}
