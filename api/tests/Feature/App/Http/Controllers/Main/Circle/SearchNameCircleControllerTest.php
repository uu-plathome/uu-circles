<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Models\CircleSearchWord;
use App\Usecases\Main\Circle\GetRecommendCircleUsecase;
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
        CircleSearchWord::query()->delete();
        Log::info($search);

        // WHEN
        $response = $this->get("/api/circle/search/$search");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('recommendCircles', $response);
        $this->assertCount(GetRecommendCircleUsecase::LIMIT, $response['recommendCircles']);

        // DBに検索ワードが保存されているか
        $this->assertTrue(CircleSearchWord::whereWord($search)->exists());
    }

    public function testRequest_Ulabがみつかる()
    {
        Log::info("testRequest_Ulabがみつかる");

        // GIVEN
        $search = 'U-lab';
        CircleSearchWord::query()->delete();

        // WHEN
        $response = $this->get("/api/circle/search/$search");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertArrayHasKey('recommendCircles', $response);
        $this->assertNotCount(0, $response['data']);
        $this->assertCount(GetRecommendCircleUsecase::LIMIT, $response['recommendCircles']);

        $this->assertArrayHasKey('tagPageViewRanking', $response);
        $this->assertIsArray($response['tagPageViewRanking']);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);

        // DBに検索ワードが保存されているか
        $this->assertTrue(CircleSearchWord::whereWord($search)->exists());
    }
}
