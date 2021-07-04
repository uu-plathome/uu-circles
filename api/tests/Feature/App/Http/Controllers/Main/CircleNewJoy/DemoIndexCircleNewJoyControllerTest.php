<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Enum\RouteProperty\ApiRouteProperty;
use App\Models\Circle;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class DemoIndexCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('DemoIndexCircleNewJoyControllerTest');
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
        $circle = Circle::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        // WHEN
        $response = $this->get(route(ApiRouteProperty::MainDemoCircleNewJoyIndex, [
            'slug' => $circle->slug,
        ]));

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }
}
