<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertiseCountersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertise_counters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('advertise_id')->comment('広告のid');
            $table->unsignedBigInteger('count')->default(0)->comment('広告のクリック数');
            $table->string('link')->comment('広告URL');
            $table->timestamps();

            $table->foreign('advertise_id')->references('id')->on('advertises');
        });

        DB::statement("ALTER TABLE advertise_counters COMMENT '広告のクリック数の計測'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('advertise_counters');
    }
}
