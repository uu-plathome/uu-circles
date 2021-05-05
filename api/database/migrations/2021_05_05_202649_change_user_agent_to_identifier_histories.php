<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeUserAgentToIdentifierHistories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('identifier_histories', function (Blueprint $table) {
            $table->string('user_agent', 2000)->nullable()->comment('User Agent')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('identifier_histories', function (Blueprint $table) {
            $table->string('user_agent')->nullable()->comment('User Agent')->change();
        });
    }
}
