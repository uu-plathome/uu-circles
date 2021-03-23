<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPrivateNewJoyLinkToCircleNewJoys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('circle_new_joys', function (Blueprint $table) {
            $table->string('private_newjoy_link')->nullable()->comment('非公開リンク');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circle_new_joys', function (Blueprint $table) {
            $table->dropColumn('private_newjoy_link');
        });
    }
}
