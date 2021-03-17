<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Auth;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class LoginAdminControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("LoginAdminControllerTest");
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testSuccess_usernameでログインできる()
    {
        Log::info("testSuccess_usernameでログインできる");

        // GIVEN

        // WHEN
        $response = $this->post('/admin/api/login', [
            'usernameOrEmail' => 'tester',
            'password'        => 'Test1234@@',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('username', $response);
        $this->assertArrayHasKey('email', $response);
        $this->assertSame('tester', $response['username']);
        $this->assertSame('tester@example.com', $response['email']);
    }

    public function testSuccess_emailでログインできる()
    {
        Log::info("testSuccess_emailでログインできる");

        // GIVEN

        // WHEN
        $response = $this->post('/admin/api/login', [
            'usernameOrEmail' => 'tester@example.com',
            'password'        => 'Test1234@@',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('username', $response);
        $this->assertArrayHasKey('email', $response);
        $this->assertSame('tester', $response['username']);
        $this->assertSame('tester@example.com', $response['email']);
    }

    public function testRequest_ログイン中のとき()
    {
        Log::info("testRequest");

        // GIVEN

        // WHEN
        $response = $this->get('/admin/api/login', [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertStatus(405);
    }
}
