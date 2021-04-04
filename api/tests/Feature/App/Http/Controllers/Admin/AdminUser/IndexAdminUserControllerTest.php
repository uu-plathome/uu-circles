<?php

namespace Tests\Feature\App\Http\Controllers\Admin\AdminUser;

use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexAdminUserControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("IndexAdminUserControllerTest");
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

        // WHEN
        $response = $this->get('/admin/api/admin-user', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }
}
