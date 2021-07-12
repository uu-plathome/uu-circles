<?php

namespace Tests\Feature\App\Http\Controllers\Main\Gacha;

use App\Models\Identifier;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class GachaDrawControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('GachaPickupListControllerTest');
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_単発ガチャ()
    {
        Log::info('testRequest_単発ガチャ');

        // GIVEN
        $NUMBER = 1;

        $identifier = Identifier::factory()->count(1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);

        // WHEN
        $response = $this->post("api/gacha/circle?number={$NUMBER}&X-IDENTIFIER_HASH={$identifier->identifier_hash}", []);

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('resultCircles', $response);
        $this->assertArrayHasKey('pickupCircles', $response);
        $this->assertArrayHasKey('count', $response);
        $this->assertArrayHasKey('createdAt', $response);
        $this->assertArrayHasKey('gachaHash', $response);

        //数の確認
        $this->assertCount($NUMBER, $response['resultCircles']);
        $this->assertSame($NUMBER, $response['count']);
        $this->assertIsString($response['gachaHash']);
    }

    public function testRequest_10連ガチャ()
    {
        Log::info('testRequest_10連ガチャ');

        // GIVEN
        $NUMBER = 10;

        $identifier = Identifier::factory()->count(1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);
        // WHEN
        $response = $this->post("api/gacha/circle?number={$NUMBER}&X-IDENTIFIER_HASH={$identifier->identifier_hash}", []);

        // THEN
        $response->assertOk();

        $this->assertArrayHasKey('resultCircles', $response);
        $this->assertArrayHasKey('pickupCircles', $response);
        $this->assertArrayHasKey('count', $response);
        $this->assertArrayHasKey('createdAt', $response);
        $this->assertArrayHasKey('gachaHash', $response);

        //数の確認
        $this->assertCount($NUMBER, $response['resultCircles']);
        $this->assertSame($NUMBER, $response['count']);
        $this->assertIsString($response['gachaHash']);
    }
}
