<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Models\Circle;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class GetCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("GetCircleControllerTest");
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
        Http::fake();
        $circle = Circle::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        // WHEN
        $response = $this->get("/api/circle/{$circle->slug}");

        // THEN
        $response->assertOk();
    }

    public function testRequest_存在しないサークルは404である()
    {
        Log::info("testRequest");

        // GIVEN
        $slug = 'aaaaabbbbbccccc';

        // WHEN
        $response = $this->get("/api/circle/{$slug}");

        // THEN
        $response->assertNotFound();
    }
}
