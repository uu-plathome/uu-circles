<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Circle;

use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use App\Models\Circle;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class ShowCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("ShowAdvertiseControllerTest");
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
        /** @var Circle $advertise */
        $circle = Circle::inRandomOrder()->first();
        Log::info('[GIVEN]', [
            'circle' => $circle,
            'id'     => $circle->id,
        ]);

        // WHEN
        $response = $this->get("/admin/api/circle/$circle->id", [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }
}
