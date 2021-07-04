<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Enum\DemoCircleNewjoyType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Enum\RouteProperty\ApiRouteProperty as ARP;
use App\Models\Circle;
use App\Models\DemoCircleNewjoy;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class DemoTodayCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected Carbon $now;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('DemoTodayCircleNewJoyControllerTest');
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
        $response = $this->get(route(ARP::MainCircleNewJoyTodayDemo));

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
        DemoCircleNewjoy::query()->delete();
        $this->assertCount(0, DemoCircleNewjoy::all());

        // WHEN
        $response = $this->get(route(ARP::MainCircleNewJoyTodayDemo));
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
        DemoCircleNewjoy::query()->delete();
        $this->assertCount(0, DemoCircleNewjoy::all());

        $circle = Circle::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($circle);

        $initialData = [
            DemoCircleNewJoyProperty::circle_id               => $circle->id,
            DemoCircleNewJoyProperty::title                   => '交流会',
            DemoCircleNewJoyProperty::place_of_activity       => PlaceOfActivity::NEWJOY_DISCORD,
            DemoCircleNewJoyProperty::description             => 'ぜひ参加してください',
            DemoCircleNewJoyProperty::demo_circle_newjoy_type => DemoCircleNewjoyType::TODAY,
            DemoCircleNewJoyProperty::published               => true,
            DemoCircleNewJoyProperty::start_date              => Carbon::now()->subHour(1)->copy()->format('Y-m-d H:i'),
            DemoCircleNewJoyProperty::end_date                => Carbon::now()->addHour(4)->copy()->format('Y-m-d H:i'),
        ];
        $demoCircleNewJoy = DemoCircleNewjoy::create($initialData);

        // WHEN
        $response = $this->get(route(ARP::MainCircleNewJoyTodayDemo));
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
