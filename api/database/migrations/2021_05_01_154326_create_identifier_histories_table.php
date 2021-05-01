<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIdentifierHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identifier_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('identifier_id')->constrained();
            $table->string('user_agent')->nullable()->comment('User Agent');
            $table->ipAddress('ip_address')->nullable()->comment('Ip Address');
            $table->unsignedBigInteger('count')->comment('アクセス数');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE identifier_histories COMMENT '識別子のアクセス履歴'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('identifier_histories');
    }
}
