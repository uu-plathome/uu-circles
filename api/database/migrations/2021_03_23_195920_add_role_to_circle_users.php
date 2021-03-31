<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleToCircleUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('circle_users', function (Blueprint $table) {
            $table->enum('role', ['MANAGER', 'COMMON'])->default('COMMON')->comment('権限');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circle_users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
}
