<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Models\Circle;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class ShowCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("ShowCircleNewJoyControllerTest");
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
        $circle = Circle::whereRelease(true)
            ->hasByNonDependentSubquery('circleNewJoys')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        $circleNewJoy = $circle->circleNewJoys()->first();
        Log::info($circleNewJoy);
        $this->assertNotNull($circleNewJoy);

        // WHEN
        $response = $this->get("/api/circle/$circle->slug/newjoy/$circleNewJoy->circleNewJoyId");

        // THEN
        $response->assertOk();
    }
}
