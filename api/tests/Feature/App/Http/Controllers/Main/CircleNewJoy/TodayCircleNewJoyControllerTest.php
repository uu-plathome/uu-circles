<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Enum\RouteProperty\ApiRouteProperty as ARP;
use App\Models\Circle;
use App\Models\CircleNewJoy;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class TodayCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected Carbon $now;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('TodayCircleNewJoyControllerTest');
        $this->now = Carbon::now()->microsecond(0);
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info('testRequest');

        // GIVEN
        Http::fake();

        // WHEN
        $response = $this->get(route(ARP::MainCircleNewJoyToday));

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('todayCircleNewJoys', $response);
        $this->assertArrayHasKey('futureCircleNewJoys', $response);
        $this->assertIsArray($response['todayCircleNewJoys']);
        $this->assertIsArray($response['futureCircleNewJoys']);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }

    public function testRequest_新歓が存在しないとき()
    {
        Log::info('testRequest_新歓が存在しないとき');

        // GIVEN
        CircleNewJoy::query()->delete();
        $this->assertCount(0, CircleNewJoy::all());

        // WHEN
        $response = $this->get(route(ARP::MainCircleNewJoyToday));
        Log::info('response', [
            $response,
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('todayCircleNewJoys', $response);
        $this->assertArrayHasKey('futureCircleNewJoys', $response);
        $this->assertIsArray($response['todayCircleNewJoys']);
        $this->assertIsArray($response['futureCircleNewJoys']);
        $this->assertCount(0, $response['todayCircleNewJoys']);
        $this->assertCount(0, $response['futureCircleNewJoys']);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }

    public function testRequest_今日の新歓が存在するとき()
    {
        Log::info('testRequest_今日の新歓が存在するとき');

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
        $response = $this->get(route(ARP::MainCircleNewJoyToday));
        Log::info('response', [
            $response,
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('todayCircleNewJoys', $response);
        $this->assertArrayHasKey('futureCircleNewJoys', $response);
        $this->assertIsArray($response['todayCircleNewJoys']);
        $this->assertIsArray($response['futureCircleNewJoys']);
        $this->assertCount(1, $response['todayCircleNewJoys']);
        $this->assertCount(0, $response['futureCircleNewJoys']);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }
}
