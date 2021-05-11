<?php

namespace Database\Seeders;

use App\Models\Announcement;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        DB::beginTransaction();

        try {
            // 通常のお知らせ
            Announcement::factory()->count(1)->create();
            // 管理者画面のみ固定
            Announcement::factory()->count(1)->isAdminViewFixed()->create();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
