<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Models\Circle;
use App\Usecases\Main\Circle\GetRecommendCircleUsecase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class SearchCategoryCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("SearchCategoryCircleControllerTest");
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
        $categoryList = CategorySlugProperty::getAll();
        $category = $categoryList[array_rand($categoryList)];
        Log::info($category);

        // WHEN
        $response = $this->get("/api/circle/category/$category");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('recommendCircles', $response);
        $this->assertCount(GetRecommendCircleUsecase::LIMIT, $response['recommendCircles']);

        $this->assertArrayHasKey('tagPageViewRanking', $response);
        $this->assertIsArray($response['tagPageViewRanking']);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }

    public function testRequest_存在しないカテゴリーは404である()
    {
        Log::info("testRequest_存在しないカテゴリーは404である");

        // GIVEN
        $category = 'aaaaa';

        // WHEN
        $response = $this->get("/api/circle/category/$category");

        // THEN
        $response->assertNotFound();
    }
}
