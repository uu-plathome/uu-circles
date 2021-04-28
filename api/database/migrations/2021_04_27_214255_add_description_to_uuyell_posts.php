<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDescriptionToUuyellPosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('uuyell_posts', function (Blueprint $table) {
            $table->string('description')->after('title')->nullable()->comment('抜粋');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('uuyell_posts', function (Blueprint $table) {
            $table->dropColumn('description');
        });
    }
}
