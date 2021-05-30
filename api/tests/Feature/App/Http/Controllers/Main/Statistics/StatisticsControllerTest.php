<?php

namespace Tests\Feature\App\Http\Controllers\Main\Statistics;

use App\Support\Str;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class StatisticsControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("StatisticsControllerTest");
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
        $response = $this->get('/api/statistics');

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('statistics', $response);
        $this->assertIsArray($response['statistics']);

        $this->assertArrayHasKey(Str::camel('circle_page_views_high_ranking'), $response['statistics']);
        $this->assertIsArray($response['statistics'][Str::camel('circle_page_views_high_ranking')]);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }
}
