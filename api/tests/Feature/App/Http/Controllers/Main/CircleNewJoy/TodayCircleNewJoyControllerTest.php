<?php

namespace Tests\Feature\App\Http\Controllers\Main\CircleNewJoy;

use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class TodayCircleNewJoyControllerTest extends TestCase
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

        // WHEN
        $response = $this->get('/api/circle/newjoy');

        // THEN
        $response->assertOk();
    }
}
