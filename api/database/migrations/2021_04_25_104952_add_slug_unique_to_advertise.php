<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AddSlugUniqueToAdvertise extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('advertises', function (Blueprint $table) {
            $table->uuid('slug')->nullable()->comment('広告のslug')->change();
        });

        DB::table('advertises')->whereNull('slug')->orderBy('id')->chunk(100, function ($advertises) {
            foreach ($advertises as $advertise) {
                $advertise->update([
                    'slug' => Str::uuid(),
                ]);
            }
        });

        Schema::table('advertises', function (Blueprint $table) {
            $table->uuid('slug')->unique()->comment('広告のslug')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('advertises', function (Blueprint $table) {
            $table->uuid('slug')->comment('広告のslug')->change();
        });
    }
}
