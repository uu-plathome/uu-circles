<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Announcement;

use App\Models\Announcement;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class DeleteAnnouncementControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('DeleteAnnouncementControllerTest');
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
        /** @var Announcement $announcement */
        $announcement = Announcement::factory()->count(1)->create()->first();
        $announcementId = $announcement->id;

        // WHEN
        $response = $this->delete("/admin/api/announcement/$announcementId", [], [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertTrue(Announcement::whereId($announcementId)->doesntExist());
    }
}
