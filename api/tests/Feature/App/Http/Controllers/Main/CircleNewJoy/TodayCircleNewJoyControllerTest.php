<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Models\CircleNewJoy;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class TodayCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("TodayCircleNewJoyControllerTest");
        Cache::clear();
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

        // WHEN
        $response = $this->get('/api/circle/newjoy');

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('todayCircleNewJoys', $response);
        $this->assertArrayHasKey('futureCircleNewJoys', $response);
        $this->assertIsArray($response['todayCircleNewJoys']);
        $this->assertIsArray($response['futureCircleNewJoys']);
    }

    public function testRequest_新歓が存在しないとき()
    {
        Log::info("testRequest_新歓が存在しないとき");

        // GIVEN
        CircleNewJoy::query()->delete();
        $this->assertCount(0, CircleNewJoy::all());

        // WHEN
        $response = $this->get('/api/circle/newjoy');
        Log::info('response', [
            $response
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('todayCircleNewJoys', $response);
        $this->assertArrayHasKey('futureCircleNewJoys', $response);
        $this->assertIsArray($response['todayCircleNewJoys']);
        $this->assertIsArray($response['futureCircleNewJoys']);
        $this->assertCount(0, $response['todayCircleNewJoys']);
        $this->assertCount(0, $response['futureCircleNewJoys']);
    }
}
