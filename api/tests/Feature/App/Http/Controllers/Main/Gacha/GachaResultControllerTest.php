<?php

namespace Tests\Feature\App\Http\Controllers\Main\Gacha;

use App\Models\Identifier;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class GachaResultControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("GachaPickupListControllerTest");
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    /**
     * /gacha/circleでガチャを引き、
     * /gacha/circle/result/{gachaHash}でガチャの結果を取得する
     */
    public function testRequest_APIで単発ガチャを引き、結果を得られるか()
    {
        Log::info("testRequest");

        // GIVEN
        $NUMBER = 1;

        // 識別子発行
        $identifier = factory(Identifier::class, 1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);

        // WHEN
        $gachaDrewResponse = $this->post("api/gacha/circle?number={$NUMBER}", [], [
            "X-IDENTIFIER_HASH" => $identifier->identifier_hash
        ]);
        $this->assertArrayHasKey("resultCircles", $gachaDrewResponse);
        $this->assertArrayHasKey("pickupCircles", $gachaDrewResponse);
        $this->assertArrayHasKey("count", $gachaDrewResponse);
        $this->assertArrayHasKey("createdAt", $gachaDrewResponse);
        $this->assertArrayHasKey("gachaHash", $gachaDrewResponse);

        //数の確認
        $this->assertCount($NUMBER, $gachaDrewResponse["resultCircles"]);
        $this->assertSame($NUMBER, $gachaDrewResponse["count"]);
        $this->assertIsString($gachaDrewResponse["gachaHash"]);

        $gachaHash = $gachaDrewResponse['gachaHash'];

        // WHEN
        $response = $this->get("api/gacha/circle/result/{$gachaHash}");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey("resultCircles", $response);
        $this->assertArrayHasKey("pickupCircles", $response);
        $this->assertArrayHasKey("count", $response);
        $this->assertArrayHasKey("createdAt", $response);
        $this->assertArrayHasKey("gachaHash", $response);

        //数の確認
        $this->assertCount($NUMBER, $response["resultCircles"]);
        $this->assertSame($NUMBER, $response["count"]);
        $this->assertIsString($response["gachaHash"]);
    }

    /**
     * /gacha/circleでガチャを引き、
     * /gacha/circle/result/{gachaHash}でガチャの結果を取得する
     */
    public function testRequest_APIで10連ガチャを引き、結果を得られるか()
    {
        Log::info("testRequest");

        // GIVEN
        $NUMBER = 10;

        // 識別子発行
        $identifier = factory(Identifier::class, 1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);

        // WHEN
        $gachaDrewResponse = $this->post("api/gacha/circle?number={$NUMBER}", [], [
            "X-IDENTIFIER_HASH" => $identifier->identifier_hash
        ]);
        $this->assertArrayHasKey("resultCircles", $gachaDrewResponse);
        $this->assertArrayHasKey("pickupCircles", $gachaDrewResponse);
        $this->assertArrayHasKey("count", $gachaDrewResponse);
        $this->assertArrayHasKey("createdAt", $gachaDrewResponse);
        $this->assertArrayHasKey("gachaHash", $gachaDrewResponse);

        //数の確認
        $this->assertCount($NUMBER, $gachaDrewResponse["resultCircles"]);
        $this->assertSame($NUMBER, $gachaDrewResponse["count"]);
        $this->assertIsString($gachaDrewResponse["gachaHash"]);

        $gachaHash = $gachaDrewResponse['gachaHash'];

        // WHEN
        $response = $this->get("api/gacha/circle/result/{$gachaHash}");

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey("resultCircles", $response);
        $this->assertArrayHasKey("pickupCircles", $response);
        $this->assertArrayHasKey("count", $response);
        $this->assertArrayHasKey("createdAt", $response);
        $this->assertArrayHasKey("gachaHash", $response);

        //数の確認
        $this->assertCount($NUMBER, $response["resultCircles"]);
        $this->assertSame($NUMBER, $response["count"]);
        $this->assertIsString($response["gachaHash"]);
    }
}
