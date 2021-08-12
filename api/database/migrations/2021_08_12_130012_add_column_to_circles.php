<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToCircles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('page_position_histories', function (Blueprint $table) {
            $table->foreignId('circle_id')->nullable()->after('page_position_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('page_position_histories', function (Blueprint $table) {
            $table->dropColumn(['circle_id']);
        });
    }
}
