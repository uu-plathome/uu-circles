<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use App\Models\Circle;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        // GIVEN
        $circle = Circle::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($circle);
        Log::info($circle);

        // WHEN
        $response = $this->get("/api/circle/{$circle->slug}/newjoy");

        // THEN
        $response->assertOk();
    }
}
