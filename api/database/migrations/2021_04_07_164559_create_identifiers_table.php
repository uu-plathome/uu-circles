<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIdentifiersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identifiers', function (Blueprint $table) {
            $table->UnsignedBigInteger('id');
            $table->string('identifier_hash')->comment('UUIDをハッシュ化したもの');
            $table->timestamps();
        });
        DB::statement("ALTER TABLE identifiers COMMENT '識別子管理'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('identifiers');
    }
}
