<?php

namespace Tests\Feature\App\Http\Controllers\Admin\AllUser;

use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class IndexAllUserControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('IndexAllUserControllerTest');
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

        // WHEN
        $response = $this->get('/admin/api/user/circle', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }

    public function testRequest_検索つき()
    {
        Log::info('testRequest');

        // GIVEN

        // WHEN
        $response = $this->get('/admin/api/user/circle?search=udai', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }
}
