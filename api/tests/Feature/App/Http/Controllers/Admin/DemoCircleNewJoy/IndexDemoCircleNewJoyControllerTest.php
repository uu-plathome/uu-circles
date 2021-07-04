<?php

namespace Tests\Feature\App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Models\Circle;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class IndexDemoCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('IndexDemoCircleNewJoyControllerTest');
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
        /** @var Circle $circle */
        $circle = Circle::inRandomOrder()->first();
        Log::info('[GIVEN]', [
            'circle' => $circle,
            'id'     => $circle->id,
        ]);

        // WHEN
        $response = $this->getJson(
            '/admin/api/circle/demo/newjoy',
            [
                'Authorization' => 'Bearer test1234',
            ]
        );

        // THEN
        $response->assertOk();
    }
}
