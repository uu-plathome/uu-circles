<?php

namespace Tests\Feature\App\Http\Controllers\Admin\CircleTag;

use App\Enum\CircleTagModel;
use App\Models\Circle;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class GetCircleTagControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('GetCircleTagControllerTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_circleTagがないとき、取得できる()
    {
        Log::info('testRequest_circleTagがないとき、取得できる');

        // GIVEN
        /** @var Circle $circle */
        $circle = Circle::inRandomOrder()->first();
        $circle->circleTag()->delete();
        $circleTag = $circle->circleTag;
        Log::info('[GIVEN]', [
            'circle'    => $circle,
            'id'        => $circle->id,
            'circleTag' => $circleTag,
        ]);
        $this->assertNotNull($circle);
        $this->assertNull($circleTag);

        // WHEN
        $response = $this->get("/admin/api/circle/$circle->id/tag", [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('circleTag', $response);
        $this->assertIsArray($response['circleTag']);
        $this->assertEquals([], $response['circleTag']);
    }

    public function testRequest_circleTagがあるとき、取得できる()
    {
        Log::info('testRequest_circleTagがないとき、取得できる');

        // GIVEN
        /** @var Circle $circle */
        $circle = Circle::inRandomOrder()->first();
        $circle->circleTag()->delete();
        $circleTag = $circle->circleTag;
        Log::info('[GIVEN]', [
            'circle'    => $circle,
            'id'        => $circle->id,
            'circleTag' => $circleTag,
        ]);
        $this->assertNotNull($circle);
        $this->assertNull($circleTag);
        $circle->circleTag()->create([
            'sport' => true,
        ]);

        // WHEN
        $response = $this->get("/admin/api/circle/$circle->id/tag", [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('circleTag', $response);
        $this->assertIsArray($response['circleTag']);
        $this->assertEquals([
            CircleTagModel::SPORT,
        ], $response['circleTag']);
    }
}
