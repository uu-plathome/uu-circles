<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Auth;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class LogoutAdminControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    const TOKEN = 'test1234';

    protected ?int $userId;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("LogoutAdminControllerTest");
        Cache::clear();
        $this->userId = User::whereApiToken(self::TOKEN)->first()->id;
    }

    /**
     * @throws Exception
     */
    protected function tearDown(): void
    {
        if (!$this->userId) {
            return;
        }

        DB::beginTransaction();
        try {
            $user = User::find($this->userId);
            $user->api_token = self::TOKEN;
            $user->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
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
        $token = self::TOKEN;
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
