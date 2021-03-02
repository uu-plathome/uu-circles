<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Models\Circle;
use App\Models\CircleNewJoy;
use App\Support\Arr;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class TodayCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected Carbon $now;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("TodayCircleNewJoyControllerTest");
        $this->now = Carbon::now()->microsecond(0);
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

    public function testRequest_今日の新歓が存在するとき()
    {
        Log::info("testRequest_今日の新歓が存在するとき");

        // GIVEN
        CircleNewJoy::query()->delete();
        $this->assertCount(0, CircleNewJoy::all());

        $circle = Circle::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($circle);

        $startDate = $this->now->copy()->subMinutes(30);
        $endDate = $this->now->copy()->addMinutes(30);
        factory(CircleNewJoy::class, 1)->create([
            'circle_id'  => $circle->id,
            'start_date' => $startDate,
            'end_date'   => $endDate,
        ]);

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
        $this->assertCount(1, $response['todayCircleNewJoys']);
        $this->assertCount(0, $response['futureCircleNewJoys']);
    }
}
