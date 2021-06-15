<?php

namespace Tests\Feature\App\Http\Controllers\Main\Advertise;

use App\Enum\RouteProperty\ApiRouteProperty;
use App\Http\Controllers\Main\Main\IndexController;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class GetMainAdvertiseControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('GetMainAdvertiseControllerTest');
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

        // WHEN
        $response = $this->get(route(ApiRouteProperty::MainAdvertises));

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('mainAdvertises', $response);
        $this->assertIsArray($response['mainAdvertises']);

        $this->assertArrayHasKey('advertises', $response);
        $this->assertIsArray($response['advertises']);
        $this->assertCount(IndexController::ADVERTISE_MAX_VIEW, $response['advertises']);
    }
}
