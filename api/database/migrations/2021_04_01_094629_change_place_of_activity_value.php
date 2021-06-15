<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangePlaceOfActivityValue extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // DISCORDをNEWJOY_DISCORDに変更する

        DB::beginTransaction();

        try {
            DB::table('circle_new_joys')
                ->where('place_of_activity', 'DISCORD')
                ->update([
                    'place_of_activity' => 'NEWJOY_DISCORD',
                ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::beginTransaction();

        try {
            DB::table('circle_new_joys')
                ->where('place_of_activity', 'NEWJOY_DISCORD')
                ->update([
                    'place_of_activity' => 'DISCORD',
                ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw $e;
        }
    }
}
