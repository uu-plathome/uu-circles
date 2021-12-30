<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\TagSlugProperty;
use App\UseCases\Main\Circle\GetRecommendCircleUsecase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class SearchTagCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('SearchTagCircleControllerTest');
        Cache::clear();
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
        Http::fake();
        $tagList = TagSlugProperty::getAll();
        $tag = $tagList[array_rand($tagList)];
        Log::info($tag);

        // WHEN
        $response = $this->get("/api/circle/tag/$tag");

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

    public function testRequest_存在しないタグは404である()
    {
        Log::info('testRequest_存在しないタグは404である');

        // GIVEN
        $tag = 'aaaaa';

        // WHEN
        $response = $this->get("/api/circle/tag/$tag");

        // THEN
        $response->assertNotFound();
    }
}
