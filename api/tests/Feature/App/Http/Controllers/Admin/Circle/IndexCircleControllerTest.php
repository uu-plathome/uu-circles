<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Circle;

use App\Enum\RouteProperty\AdminRouteProperty;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class IndexCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('IndexCircleControllerTest');
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
        $response = $this->get(route(AdminRouteProperty::AdminCircleIndex), [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }
}
