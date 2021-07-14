<?php

use App\Enum\RouteProperty\ApiRouteProperty as ARP;
use App\Http\Controllers\Main\Advertise;
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
// トップページ (デモ)
Route::get('/main/demo', Main\DemoIndexController::class)
    ->name(ARP::MainDemoIndex);
// サイトマップ
Route::get('/sitemap', Sitemap\SitemapController::class)
    ->name(ARP::MainSitemap);
// 統計
Route::get('/statistics', Statistics\StatisticsController::class)
    ->name(ARP::MainStatistics);
// 広告
Route::get('/advertises', Advertise\GetMainAdvertisesController::class)
    ->name(ARP::MainAdvertises);
// 今日の新歓
Route::get('/circle/newjoy', CircleNewJoy\TodayCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyToday);
// 今日の新歓 (デモ)
Route::get('/circle/newjoy/demo', CircleNewJoy\DemoTodayCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyTodayDemo);

// サークル一覧
Route::get('/circle', Circle\IndexCircleController::class)
    ->name(ARP::MainCircleList);
Route::get('/circle/search/{search}', Circle\SearchNameCircleController::class)
    ->name(ARP::MainSearchWord);
Route::get('/circle/category/{category}', Circle\SearchCategoryCircleController::class)
    ->name(ARP::MainSearchByCategory);
Route::get('/circle/tag/{tag}', Circle\SearchTagCircleController::class)
    ->name(ARP::MainSearchByTag);

// サークル詳細
Route::get('/circle/{slug}', Circle\GetCircleController::class)
    ->name(ARP::MainCircleShow);

// 新歓
Route::get('/circle/{slug}/newjoy', CircleNewJoy\IndexCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyIndex);
Route::get('/circle/{slug}/newjoy/{circleNewJoyId}', CircleNewJoy\ShowCircleNewJoyController::class)
    ->name(ARP::MainCircleNewJoyShow)
    ->where(['circleNewJoyId' => '[0-9]+']);

// デモ新歓
Route::get('/circle/{slug}/newjoy/demo', CircleNewJoy\DemoIndexCircleNewJoyController::class)
    ->name(ARP::MainDemoCircleNewJoyIndex);
Route::get('/circle/{slug}/newjoy/demo/{demoCircleNewJoyId}', CircleNewJoy\DemoShowCircleNewJoyController::class)
    ->name(ARP::MainDemoCircleNewJoyShow)
    ->where(['demoCircleNewJoyId' => '[0-9]+']);

// ガチャ用
Route::get('/gacha/circle/pickup', Gacha\GachaPickupListController::class)
    ->name(ARP::MainGachaPickup);
Route::post('/gacha/circle', Gacha\GachaDrawController::class)
    ->name(ARP::MainGachaDraw);
Route::get('/gacha/circle/result/{gachaHash}', Gacha\GachaResultController::class)
    ->name(ARP::MainGachaResult);
Route::get('/gacha/circle/history', Gacha\GachaHistoryController::class)
    ->name(ARP::MainGachaHistory);


// 識別子
Route::post('/identification/publish', Identification\PublishIdentificationController::class)
    ->name(ARP::MainIdentificationPublish);
Route::post('/identification/valid/{identifer_hash}', Identification\CheckIdentificationController::class)
    ->name(ARP::MainIdentificationCheck);
