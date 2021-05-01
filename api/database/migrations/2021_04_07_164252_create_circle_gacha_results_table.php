<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCircleGachaResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_gacha_results', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('gacha_hash')->unique()->comment('ガチャID');
            $table->string('identifier_hash')->comment('識別子');
            $table->json('result_circle_ids')->comment('ガチャ結果');
            $table->json('pickup_circle_ids')->comment('ピックアップ一覧の保存');
            $table->timestamps();

            $table->foreign('identifier_hash')->references('identifier_hash')->on('identifiers');
        });

        DB::statement("ALTER TABLE circle_gacha_results COMMENT 'ガチャ結果'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_gacha_results');
    }
}
