<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertiseCounterHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertise_counter_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('advertise_id')->comment('広告のid');
            $table->unsignedBigInteger('count')->default(0)->comment('広告のクリック数');
            $table->string('link')->comment('広告URL');
            $table->date('date')->comment('日付');
            $table->timestamps();

            $table->foreign('advertise_id')->references('id')->on('advertises');
        });

        DB::statement("ALTER TABLE advertise_counter_histories COMMENT '１日ごとの広告のクリック数の計測'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('advertise_counter_histories');
    }
}
