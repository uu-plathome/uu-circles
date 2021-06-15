<?php

namespace Tests\Feature\App\Http\Controllers\Circle\Storage;

use App\Enum\Property\UserProperty;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class PutStorageControllerTest extends TestCase
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
        /** @var \App\Models\User $user */
        $user = User::whereActive(true)
            ->whereNotNull(UserProperty::email_verified_at)
            ->hasByNonDependentSubquery('circleUsers', function ($query) {
                $query->hasByNonDependentSubquery('circle', function ($query) {
                    $query->whereRelease(true);
                });
            })
            ->inRandomOrder()
            ->first();

        Storage::fake('local');
        $file = UploadedFile::fake()->image('photo1.jpg');

        // WHEN
        $response = $this->post('/circle/api/storage', [
            'file' => $file,
        ], [
            'Authorization' => "Bearer $user->api_token",
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('url', $response);
        $this->assertIsString($response['url']);
    }

    public function testRequest_認証エラー()
    {
        Log::info('testRequest');

        // GIVEN
        Storage::fake('local');
        $file = UploadedFile::fake()->image('photo1.jpg');

        // WHEN
        $response = $this->post('/circle/api/storage', [
            'file' => $file,
        ], [
            'Authorization' => 'Bearer abcdefg-fake',
        ]);

        // THEN
        $response->assertStatus(400);
    }
}
