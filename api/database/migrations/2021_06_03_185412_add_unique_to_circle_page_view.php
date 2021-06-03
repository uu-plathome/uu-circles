<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddUniqueToCirclePageView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('circle_page_views')->truncate();

        Schema::table('circle_page_views', function (Blueprint $table) {
            $table->unique('circle_id');
            $table->unique('slug');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circle_page_views', function (Blueprint $table) {
            $table->dropColumn([
                'circle_id',
                'slug',
            ]);
        });
    }
}
