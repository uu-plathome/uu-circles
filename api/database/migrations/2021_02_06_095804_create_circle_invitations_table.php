<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCircleInvitationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circle_invitations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('circle_id');
            $table->string('token');
            $table->boolean('active')->default(true);
            $table->unsignedBigInteger('created_user_id');
            $table->timestamps();

            $table->foreign('created_user_id')->references('id')->on('users');
            $table->foreign('circle_id')->references('id')->on('circles');
        });

        DB::statement("ALTER TABLE circle_invitations COMMENT '部員アカウント招待'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circle_invitations');
    }
}
