<?php

namespace Tests\Feature\App\Http\Controllers\Main\Main;

use App\Enum\Property\IdentifierProperty;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class PublishIdentificationControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("PublishIdentificationControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info("PublishIdentificationControllerTest");

        // GIVEN

        // WHEN
        $response = $this->post('/api/identification/publish');

        // THEN
        $response->assertOk();

        //キーの存在確認
        //idenfierHashに変換←Str::camel スネーク→キャメル型
        $this->assertArrayHasKey(Str::camel(IdentifierProperty::identifier_hash), $response);
        
        //文字列であることの確認
        $this->assertIsString($response[Str::camel(IdentifierProperty::identifier_hash)]);
    }
}