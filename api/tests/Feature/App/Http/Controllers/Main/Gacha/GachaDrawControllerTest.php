<?php

namespace Tests\Feature\App\Http\Controllers\Main\Gacha;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class GachaPickupListControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("GachaPickupListControllerTest");
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
        $response = $this->post("api/gacha/circle?number={number}");

        // THEN
        $response->assertOk();

    }
}