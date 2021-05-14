<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnouncementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('お知らせのタイトル');
            $table->longText('description')->nullable()->comment('お知らせ文');
            $table->string('link')->nullable()->comment('お知らせURL');
            $table->string('announcement_type')->comment('お知らせ種類');
            $table->string('importance')->default('MIDDLE')->comment('重要度');
            $table->boolean('for_main_view')->default(false)->comment('メイン画面に表示するかどうか');
            $table->boolean('for_circle_mail')->default(false)->comment('サークル管理者にメール通知するかどうか');
            $table->boolean('for_admin_view')->default(false)->comment('管理者画面に表示するかどうか');
            $table->boolean('for_admin_mail')->default(false)->comment('管理者にメール通知するかどうか');
            $table->boolean('for_newjoy_discord')->default(false)->comment('新歓ディスコードに通知するかどうか');
            $table->boolean('active')->default(true)->comment('公開設定');
            $table->boolean('is_main_view_fixed')->default(false)->comment('メイン画面に固定表示するかどうか');
            $table->boolean('is_circle_view_fixed')->default(false)->comment('サークル管理画面に固定表示するかどうか');
            $table->boolean('is_admin_view_fixed')->default(false)->comment('管理者画面に固定表示するかどうか');
            $table->dateTime('notification_time')->nullable()->comment('通知日時');
            $table->dateTime('notified_at')->nullable()->comment('実際に通知した日時');
            $table->dateTime('publish_from')->nullable()->comment('公開開始日時');
            $table->dateTime('publish_to')->nullable()->comment('公開終了日時');
            $table->softDeletes();
            $table->timestamps();
        });

        DB::statement("ALTER TABLE announcements COMMENT 'お知らせ'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('announcements');
    }
}
