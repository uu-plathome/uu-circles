<?php

namespace Tests\Feature\App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Enum\PlaceOfActivity;
use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Models\Circle;
use App\Models\DemoCircleNewjoy;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class ShowDemoCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('ShowDemoCircleNewJoyControllerTest');
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
        /** @var Circle $circle */
        $circle = Circle::inRandomOrder()->first();
        Log::info('[GIVEN]', [
            'circle' => $circle,
            'id'     => $circle->id,
        ]);
        $initialData = [
            DemoCircleNewJoyProperty::circle_id         => $circle->id,
            DemoCircleNewJoyProperty::title             => '交流会',
            DemoCircleNewJoyProperty::place_of_activity => PlaceOfActivity::NEWJOY_DISCORD,
            DemoCircleNewJoyProperty::description       => 'ぜひ参加してください',
            DemoCircleNewJoyProperty::published         => true,
            DemoCircleNewJoyProperty::start_date        => Carbon::now()->subHour(1)->copy()->format('Y-m-d H:i'),
            DemoCircleNewJoyProperty::end_date          => Carbon::now()->addHour(4)->copy()->format('Y-m-d H:i'),
        ];
        $circleNewJoy = DemoCircleNewjoy::create($initialData);

        // WHEN
        $response = $this->getJson(
            "/admin/api/circle/demo/newjoy/$circleNewJoy->id",
            [
                'Authorization' => 'Bearer test1234',
            ]
        );

        // THEN
        $response->assertOk();
    }
}
