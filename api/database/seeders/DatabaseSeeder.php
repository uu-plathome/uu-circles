<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdvertisesTableSeeder::class);
        $this->call(AnnouncementSeeder::class);
        $this->call(CirclesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(IdentifierTableSeeder::class);
        $this->call(UuyellPostsTableSeeder::class);
        $this->call(PageViewSeeder::class);
        $this->call(TagPageViewsSeeder::class);
    }
}
