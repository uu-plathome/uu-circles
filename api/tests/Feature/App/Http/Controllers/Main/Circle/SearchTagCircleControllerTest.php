<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\TagSlugProperty;
use App\Models\Circle;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class SearchTagCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("SearchTagCircleControllerTest");
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
        $tagList = TagSlugProperty::getAll();
        $tag = $tagList[array_rand($tagList)];
        Log::info($tag);

        // WHEN
        $response = $this->get("/api/circle/tag/$tag");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('recommendCircles', $response);
        $this->assertNotCount(0, $response['recommendCircles']);
    }

    public function testRequest_存在しないタグは404である()
    {
        Log::info("testRequest_存在しないタグは404である");

        // GIVEN
        $tag = 'aaaaa';

        // WHEN
        $response = $this->get("/api/circle/tag/$tag");

        // THEN
        $response->assertNotFound();
    }
}
