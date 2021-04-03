<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class LogoutAdminControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("LogoutAdminControllerTest");
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testログアウトできる()
    {
        Log::info("testログアウトできる");

        // GIVEN
        $token = 'test1234';
        $user = User::whereApiToken($token)->first();
        Log::debug("testログアウトできる [GIVEN]", [
            'token' => $token,
            'user'  => $user,
        ]);

        // WHEN
        $response = $this->post('/admin/api/logout', [], [
            'Authorization' => "Bearer $token",
        ]);

        // THEN
        $response->assertOk();
        $this->assertNull(User::whereApiToken($token)->first());
        $newUser = User::find($user->id);
        Log::debug("testログアウトできる [THEN]", [
            'oldUser' => $user,
            'newUser' => $newUser,
        ]);
        $this->assertNotEquals($token, $newUser->api_token);
    }
}
