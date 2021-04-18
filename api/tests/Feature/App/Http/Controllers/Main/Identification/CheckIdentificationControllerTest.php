<?php

namespace Tests\Feature\App\Http\Controllers\Main\Main;

use App\Enum\Property\IdentifierProperty;
use App\Models\Identifier;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class CheckIdentificationControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("CheckIdentificationControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info("CheckIdentificationControllerTest");

        // GIVEN
        $identifier = Identifier::whereRelease(true)->inRandomOrder()->first();
        $this->assertNotNull($identifier);
        Log::info($identifier);
        // WHEN
        $response = $this->post("/api/identification/valid/{$identifier->slug}");

        // THEN
        $response->assertOk();

    }
}