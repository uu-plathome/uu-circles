<?php

namespace Tests\Feature\App\Http\Controllers\Admin\CircleNewJoy;

use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleNewJoyProperty;
use App\Models\Circle;
use App\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class RegisterCircleNewJoyControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('RegisterCircleNewJoyControllerTest');
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
            CircleNewJoyProperty::title             => '交流会',
            CircleNewJoyProperty::place_of_activity => PlaceOfActivity::NEWJOY_DISCORD,
            CircleNewJoyProperty::description       => 'ぜひ参加してください',
            CircleNewJoyProperty::release           => true,
            CircleNewJoyProperty::start_date        => Carbon::now()->subHour(1)->copy()->format('Y-m-d H:i'),
            CircleNewJoyProperty::end_date          => Carbon::now()->addHour(4)->copy()->format('Y-m-d H:i'),
            CircleNewJoyProperty::publish_from      => Carbon::now()->format('Y-m-d'),
        ]);

        // WHEN
        $response = $this->postJson(
            "/admin/api/circle/$circle->id/newjoy", 
            $postData, 
            [
                'Authorization' => 'Bearer test1234',
            ]
        );

        // THEN
        $response->assertOk();
    }
}
