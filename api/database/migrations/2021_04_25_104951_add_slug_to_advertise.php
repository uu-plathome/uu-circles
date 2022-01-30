<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AddSlugToAdvertise extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('advertises', function (Blueprint $table) {
            $table->uuid('slug')->after('title')->comment('広告のslug');
        });

        // $advertises = DB::table('advertises')->whereNull('slug')->get();
        // $advertises->each(fn ($advertise) => $advertise->update([
        //     'slug' => Str::uuid()->toString(),
        // ]));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('advertises', function (Blueprint $table) {
            $table->dropColumn([
                'slug',
            ]);
        });
    }
}
