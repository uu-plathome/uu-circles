<?php

use App\Enum\RouteProperty\ApiRouteProperty as ARP;
use App\Http\Controllers\Main\Circle;
use App\Http\Controllers\Main\CircleNewJoy;
use App\Http\Controllers\Main\Gacha;
use App\Http\Controllers\Main\Identification;
use App\Http\Controllers\Main\Main;
use App\Http\Controllers\Main\Sitemap;
use App\Http\Controllers\Main\Statistics;

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
Route::get('/main', Main\IndexController::class)
    ->name(ARP::MainIndex);
// サイトマップ
Route::get('/sitemap', Sitemap\SitemapController::class)
    ->name(ARP::MainSitemap);
// 統計
Route::get('/statistics', Statistics\StatisticsController::class)
    ->name(ARP::MainStatistics);

// サークル一覧
Route::get('/circle', Circle\IndexCircleController::class)
    ->name(ARP::MainCircleList);
Route::get('/circle/search/{search}', Circle\SearchNameCircleController::class)
    ->name(ARP::MainSearchWord);
Route::get('/circle/category/{category}', Circle\SearchCategoryCircleController::class)
    ->name(ARP::MainSearchCategory);
Route::get('/circle/tag/{tag}', Circle\SearchTagCircleController::class)
    ->name(ARP::MainSearchByTag);

// サークル詳細
Route::get('/circle/{slug}', GetCircleController::class)
    ->name(ARP::MainCircleShow);

// 新歓
Route::get('/circle/newjoy', CircleNewJoy\TodayCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyToday);
Route::get('/circle/{slug}/newjoy', CircleNewJoy\IndexCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyIndex);
Route::get('/circle/{slug}/newjoy/{circleNewJoyId}', CircleNewJoy\ShowCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyShow)
    ->where(['circleNewJoyId' => '[0-9]+']);

// ガチャ用
Route::get('/gacha/circle/pickup', Gacha\GachaPickupListController::class)
    ->name(ARP::MainGachaPickup);
Route::post('/gacha/circle', Gacha\GachaDrawController::class)
    ->name(ARP::MainGachaDraw);
Route::get('/gacha/circle/result/{gachaHash}', Gacha\GachaResultController::class)
    ->name(ARP::MainGachaResult);

// 識別子
Route::post('/identification/publish', Identification\PublishIdentificationController::class)
    ->name(ARP::MainIdentificationPublish);
Route::post('/identification/valid/{identifer_hash}', Identification\CheckIdentificationController::class)
    ->name(ARP::MainIdentificationCheck);
