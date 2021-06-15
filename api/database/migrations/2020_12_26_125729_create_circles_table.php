<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCirclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->comment('サークル名');
            $table->string('slug', 50)->unique()->comment('circle slug');
            $table->boolean('release')->default(true)->comment('公開設定');
            $table->timestamps();

            $table->index('release');
            $table->index([
                'release',
                'slug',
            ]);
        });

        DB::statement("ALTER TABLE circles COMMENT 'サークル'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circles');
    }
}
