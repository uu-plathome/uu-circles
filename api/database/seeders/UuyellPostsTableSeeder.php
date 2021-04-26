<?php

namespace Database\Seeders;

use App\Enum\Property\AdminUserProperty;
use App\Enum\Role;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class UuyellPostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        Artisan::call('copy:uu-yell');
    }
}
