<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Models\Circle;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class SearchNameCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("SearchNameCircleControllerTest");
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_ランダムな文字列()
    {
        Log::info("testRequest_ランダムな文字列");

        // GIVEN
        Http::fake();
        $search = Str::random(2);
        Log::info($search);

        // WHEN
        $response = $this->get("/api/circle/search/$search");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('recommendCircles', $response);
        $this->assertNotCount(0, $response['recommendCircles']);
    }

    public function testRequest_Ulabがみつかる()
    {
        Log::info("testRequest_Ulabがみつかる");

        // GIVEN
        $search = 'U-lab';

        // WHEN
        $response = $this->get("/api/circle/search/$search");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertArrayHasKey('recommendCircles', $response);
        $this->assertNotCount(0, $response['data']);
        $this->assertNotCount(0, $response['recommendCircles']);
    }
}
