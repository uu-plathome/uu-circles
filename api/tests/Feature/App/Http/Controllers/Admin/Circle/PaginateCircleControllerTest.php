<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Circle;

use App\Enum\RouteProperty\AdminRouteProperty;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class PaginateCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('PaginateCircleControllerTest');
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
        $response = $this->get(route(AdminRouteProperty::AdminCirclePaginate), [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }

    public function testRequestAdditionParam()
    {
        Log::info('testRequestAdditionParam');

        // GIVEN

        // WHEN
        $response = $this->get(route(AdminRouteProperty::AdminCirclePaginate, [
            'name'     => '',
            'next'     => 1,
            'previous' => 0,
        ]), [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }

    public function testRequestAdditionParamBoolean()
    {
        Log::info('testRequestAdditionParamBoolean');

        // GIVEN

        // WHEN
        $response = $this->get(route(AdminRouteProperty::AdminCirclePaginate, [
            'name'     => '',
            'next'     => true,
            'previous' => false,
        ]), [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }
}
