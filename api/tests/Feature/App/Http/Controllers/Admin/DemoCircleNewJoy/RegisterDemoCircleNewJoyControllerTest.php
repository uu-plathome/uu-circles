<?php

namespace Tests\Feature\App\Http\Controllers\Admin\DemoCircleNewJoy;

use App\Enum\DemoCircleNewjoyType;
use App\Enum\PlaceOfActivity;
use App\Enum\Property\DemoCircleNewJoyProperty;
use App\Models\Circle;
use App\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class RegisterDemoCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('RegisterDemoCircleNewJoyControllerTest');
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
        $postData = Arr::camel_keys([
            DemoCircleNewJoyProperty::title                   => '交流会',
            DemoCircleNewJoyProperty::place_of_activity       => PlaceOfActivity::NEWJOY_DISCORD,
            DemoCircleNewJoyProperty::description             => 'ぜひ参加してください',
            DemoCircleNewJoyProperty::published               => true,
            DemoCircleNewJoyProperty::demo_circle_newjoy_type => DemoCircleNewjoyType::FUTURE,
            DemoCircleNewJoyProperty::start_date              => Carbon::now()->subHour(1)->copy()->format('Y-m-d H:i'),
            DemoCircleNewJoyProperty::end_date                => Carbon::now()->addHour(4)->copy()->format('Y-m-d H:i'),
        ]);

        // WHEN
        $response = $this->postJson(
            "/admin/api/circle/$circle->id/demo/newjoy",
            $postData,
            [
                'Authorization' => 'Bearer test1234',
            ]
        );

        // THEN
        $response->assertOk();
    }
}
