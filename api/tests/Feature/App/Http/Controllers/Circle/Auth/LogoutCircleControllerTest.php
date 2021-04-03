<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class LogoutCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    protected ?int $userId;

    const TOKEN = 'test1234';

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("LogoutCircleControllerTest");
        Cache::clear();
        $this->userId = User::whereApiToken(self::TOKEN)->first()->id;
    }

    protected function tearDown(): void
    {
        if ($this->userId) {
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
    }

    public function testログアウトできる()
    {
        Log::info("testログアウトできる");

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::with([
            'circleUsers',
        ])
            ->whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers')
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                /** @var \App\Models\CircleUser $query */
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    /** @var \App\Models\Circle $query */
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);
        $token = $user->api_token;
        Log::debug("testログアウトできる [GIVEN]", [
            'token' => $token,
            'user'  => $user,
        ]);

        // WHEN
        $response = $this->post('/circle/api/logout', [], [
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
