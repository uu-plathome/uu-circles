<?php

namespace Tests\Feature\App\Http\Controllers\Main\Identification;

use App\Models\Identifier;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class CheckIdentificationControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('CheckIdentificationControllerTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info('CheckIdentificationControllerTest');

        // GIVEN
        $identifier = Identifier::factory()->count(1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);

        // WHEN
        $response = $this->post("/api/identification/valid/{$identifier->identifier_hash}");

        // THEN
        $response->assertOk();
    }
}
