<?php

namespace Tests\Feature\App\Http\Controllers\Admin\CircleTag;

use App\Http\Requests\Admin\CircleTag\CreateOrUpdateCircleTagRequest;
use App\Models\Circle;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class CreateOrUpdateCircleTagControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("CreateOrUpdateCircleTagControllerTest");
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
        $allCircleTags = CreateOrUpdateCircleTagRequest::canSelectedTags();
        $addCircleTags = (new Collection($allCircleTags))
            ->random(rand(1, count($allCircleTags)))
            ->values()
            ->toArray();

        // WHEN
        $response = $this->post("/admin/api/circle/$circle->id/tag", [
            'circle_tag' => $addCircleTags,
        ], [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertSame('success', $response['data']);
        $newCircleTag = Circle::find($circle->id)->circleTag;
        $this->assertNotNull($newCircleTag);
    }
}
