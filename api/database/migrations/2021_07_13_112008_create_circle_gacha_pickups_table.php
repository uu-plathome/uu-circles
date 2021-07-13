<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCircleGachaPickupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_gacha_pickups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('circle_id1')->comment('ピックアップされたサークル1');
            $table->unsignedBigInteger('circle_id2')->comment('ピックアップされたサークル2');
            $table->unsignedBigInteger('circle_id3')->comment('ピックアップされたサークル3');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_gacha_pickups');
    }
}
