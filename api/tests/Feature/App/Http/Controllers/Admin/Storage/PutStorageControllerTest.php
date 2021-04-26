<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Storage;

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
        Log::info("IndexAllUserControllerTest");
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
        Storage::fake('local');
        $file = UploadedFile::fake()->image('photo1.jpg');

        // WHEN
        $response = $this->post('/admin/api/storage', [
            'file' => $file,
        ], [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('url', $response);
        $this->assertIsString($response['url']);
    }
}
