<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Enum\DemoCircleNewjoyType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Enum\RouteProperty\ApiRouteProperty;
use App\Models\Circle;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class DemoShowCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('DemoShowCircleNewJoyControllerTest');
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
        $circle = Circle::whereRelease(true)
            ->hasByNonDependentSubquery('circleNewJoys')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        $initialData = [
            DemoCircleNewJoyProperty::circle_id               => $circle->id,
            DemoCircleNewJoyProperty::title                   => '交流会',
            DemoCircleNewJoyProperty::place_of_activity       => PlaceOfActivity::NEWJOY_DISCORD,
            DemoCircleNewJoyProperty::description             => 'ぜひ参加してください',
            DemoCircleNewJoyProperty::demo_circle_newjoy_type => DemoCircleNewjoyType::FUTURE,
            DemoCircleNewJoyProperty::published               => true,
            DemoCircleNewJoyProperty::start_date              => Carbon::now()->subHour(1)->copy()->format('Y-m-d H:i'),
            DemoCircleNewJoyProperty::end_date                => Carbon::now()->addHour(4)->copy()->format('Y-m-d H:i'),
        ];
        $demoCircleNewJoy = DemoCircleNewjoy::create($initialData);
        Log::info($demoCircleNewJoy);
        $this->assertNotNull($demoCircleNewJoy);

        // WHEN
        $response = $this->get(route(ApiRouteProperty::MainDemoCircleNewJoyShow, [
            'slug'               => $circle->slug,
            'demoCircleNewJoyId' => $demoCircleNewJoy->id,
        ]));

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }
}
