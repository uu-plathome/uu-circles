<?php

use App\Http\Controllers\Main\SitemapController;
use App\Http\Controllers\Main\Circle\GetCircleController;
use App\Http\Controllers\Main\Circle\IndexCircleController;
use App\Http\Controllers\Main\Circle\SearchCategoryCircleController;
use App\Http\Controllers\Main\Circle\SearchNameCircleController;
use App\Http\Controllers\Main\Circle\SearchTagCircleController;
use App\Http\Controllers\Main\CircleNewJoy\IndexCircleNewJoyController;
use App\Http\Controllers\Main\CircleNewJoy\ShowCircleNewJoyController;
use App\Http\Controllers\Main\CircleNewJoy\TodayCircleNewJoyController;
use App\Http\Controllers\Main\Gacha\GachaPickupListController;
use App\Http\Controllers\Main\Main\IndexController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// トップページ用
Route::get('/main', IndexController::class)->name('main.index');
Route::get('/sitemap', SitemapController::class)->name('api.sitemap');

// サークル
Route::get('/circle', IndexCircleController::class)->name('main.circle');
Route::get('/circle/search/{search}', SearchNameCircleController::class)->name('main.circleNewJoy.today');
Route::get('/circle/category/{category}', SearchCategoryCircleController::class)
    ->name('main.circle.category');
Route::get('/circle/tag/{tag}', SearchTagCircleController::class)->name('main.circle.tag');
Route::get('/circle/newjoy', TodayCircleNewJoyController::class)->name('main.circleNewJoy.today');
Route::get('/circle/{slug}', GetCircleController::class)->name('main.circle.show');
Route::get('/circle/{slug}/newjoy', IndexCircleNewJoyController::class)->name('main.circleNewJoy.index');
Route::get('/circle/{slug}/newjoy/{circleNewJoyId}', ShowCircleNewJoyController::class)
    ->name('main.circleNewJoy.show')
    ->where(['circleNewJoyId' => '[0-9]+']);

// ガチャ用
Route::get('/gacha/circle/pickup', GachaPickupListController::class)->name('main.gacha.pickup');
