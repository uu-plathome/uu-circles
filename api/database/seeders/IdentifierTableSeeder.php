<?php

namespace Database\Seeders;

use App\Models\Identifier;
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
        factory(Identifier::class,1)->create();
    }
}