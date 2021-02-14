<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCircleHandbillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_handbills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('circle_id');
            $table->string('image_url')->comment('画像URL');
            $table->unsignedSmallInteger('year')->nullable()->comment('作成年度');
            $table->timestamps();

            $table->foreign('circle_id')->references('id')->on('circles');
        });

        DB::statement("ALTER TABLE circle_handbills COMMENT 'サークル新歓ビラ'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_handbills');
    }
}
