<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCircleSearchWordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_search_words', function (Blueprint $table) {
            $table->id();
            $table->string('word', 1000)->comment('検索ワード');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE circle_search_words COMMENT '検索ワード'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_search_words');
    }
}
