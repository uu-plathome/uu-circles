<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Auth;

use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class ShowOwnAdminUserControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('ShowOwnAdminUserControllerTest');
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
        $response = $this->get('/admin/api/user', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
    }
}
