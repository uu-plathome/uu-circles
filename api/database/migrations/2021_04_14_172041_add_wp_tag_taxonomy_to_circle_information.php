<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWpTagTaxonomyToCircleInformation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('circle_information', function (Blueprint $table) {
            $table->string('wp_tag_taxonomy')->nullable()->after('wp_url')->comment('WordPress の Tags Taxonomy');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('circle_information', function (Blueprint $table) {
            $table->dropColumn([
                'wp_tag_taxonomy'
            ]);
        });
    }
}
