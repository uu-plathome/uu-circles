<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Auth;

use App\Enum\Property\UserProperty;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class LoginCircleControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("LoginCircleControllerTest");
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
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // WHEN
        $response = $this->post('/circle/api/login', [
            'usernameOrEmail' => $user->username,
            'password'        => 'Test1234@@',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('username', $response);
        $this->assertArrayHasKey('email', $response);
        $this->assertSame($user->username, $response['username']);
        $this->assertSame($user->email, $response['email']);
    }

    public function testSuccess_emailでログインできる()
    {
        Log::info("testSuccess_emailでログインできる");

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // WHEN
        $response = $this->post('/circle/api/login', [
            'usernameOrEmail' => $user->email,
            'password'        => 'Test1234@@',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('username', $response);
        $this->assertArrayHasKey('email', $response);
        $this->assertSame($user->username, $response['username']);
        $this->assertSame($user->email, $response['email']);
    }

    public function testRequest_ログイン中のとき()
    {
        Log::info("testRequest");

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers')
            ->inRandomOrder()
            ->first();
        $this->assertNotNull($user);

        // WHEN
        $response = $this->get('/circle/api/login', [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertStatus(405);
    }

    public function testFailed_emailVerifiedAtがnullのとき、ログインできない()
    {
        Log::info("testFailed_emailVerifiedAtがnullのとき、ログインできない");

        // GIVEN
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->hasByNonDependentSubquery('circleUsers')
            ->inRandomOrder()
            ->first();
        $user->forceFill([
            UserProperty::email_verified_at => null,
        ])->save();
        $user->refresh();
        $this->assertNotNull($user);
        $this->assertNull($user->email_verified_at);

        // WHEN
        $response = $this->post('/circle/api/login', [
            'usernameOrEmail' => $user->username,
            'password'        => 'Test1234@@',
        ]);

        // THEN
        $response->assertStatus(302);
    }
}
