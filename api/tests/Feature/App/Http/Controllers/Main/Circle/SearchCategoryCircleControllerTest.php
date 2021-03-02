<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Models\Circle;
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
        $categoryList = CategorySlugProperty::getAll();
        $category = $categoryList[array_rand($categoryList)];
        Log::info($category);

        // WHEN
        $response = $this->get("/api/circle/category/$category");

        // THEN
        $response->assertOk();
    }
}
