<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemoCircleNewjoysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demo_circle_newjoys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('circle_id')->constrained();
            $table->enum('demo_circle_newjoy_type', ['TODAY', 'FUTURE', 'NOW'])->comment('デモの種類');
            $table->string('title')->comment('新歓名');
            $table->string('description')->nullable()->comment('新歓紹介');
            $table->string('url')->nullable()->comment('新歓URL');
            $table->string('place_of_activity')->nullable()->comment('活動場所');
            $table->string('place_of_activity_detail')->nullable()->comment('活動場所詳細');
            $table->dateTime('start_date')->nullable()->comment('新歓開始日時');
            $table->dateTime('end_date')->nullable()->comment('新歓終了日時');
            $table->boolean('published')->default(true)->comment('公開設定');
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
        Schema::dropIfExists('demo_circle_newjoys');
    }
}
