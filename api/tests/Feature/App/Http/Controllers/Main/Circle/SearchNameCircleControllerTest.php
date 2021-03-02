<?php

namespace Tests\Feature\App\Http\Controllers\Main\Circle;

use App\Enum\SlugProperty\CategorySlugProperty;
use App\Models\Circle;
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
        $search = Str::random(2);

        // WHEN
        $response = $this->get("/api/circle/search/$search");

        // THEN
        $response->assertOk();
    }
}
