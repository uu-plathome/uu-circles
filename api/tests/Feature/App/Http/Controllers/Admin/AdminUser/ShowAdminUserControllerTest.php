<?php

namespace Tests\Feature\App\Http\Controllers\Admin\AdminUser;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class ShowAdminUserControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    /**
     * API Token.
     */
    const TOKEN = 'test1234';

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('ShowAdminUserControllerTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_認証中のユーザー情報を取得できる()
    {
        Log::info('testRequest_認証中のユーザー情報を取得できる');

        // GIVEN
        /** @var \App\Models\User $adminUser */
        $adminUser = User::whereApiToken(self::TOKEN)->first();
        $this->assertNotNull($adminUser);

        // WHEN
        $response = $this->get("/admin/api/admin-user/$adminUser->id", [
            'Authorization' => "Bearer $adminUser->api_token",
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
    }
}
