<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDescriptionToCircleInformation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('circle_information', function (Blueprint $table) {
            $table->string('description', 500)->nullable()->comment('サークル紹介文')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circle_information', function (Blueprint $table) {
            $table->string('description')->nullable()->comment('サークル紹介文')->change();
        });
    }
}
