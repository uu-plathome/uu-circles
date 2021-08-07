<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagePositionHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_position_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('identifier_id')->constrained();
            $table->string('page_url')->comment('ページURL');
            $table->string('page_position_id')->comment('ページ内での位置 (id)');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE page_position_histories COMMENT 'ページ位置の記録'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('page_position_histories');
    }
}
