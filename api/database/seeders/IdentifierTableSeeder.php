<?php

namespace Database\Seeders;

use App\Models\Identifier;
use App\Models\IdentifierHistory;
use Illuminate\Database\Seeder;

class IdentifierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Identifier::factory()->count(100)
            ->has(IdentifierHistory::factory()->count(3))
            ->create();
    }
}
