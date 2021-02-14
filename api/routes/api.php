<?php

use App\Http\Controllers\Main\Circle\GetCircleController;
use App\Http\Controllers\Main\CircleNewJoy\IndexCircleNewJoyController;
use App\Http\Controllers\Main\CircleNewJoy\ShowCircleNewJoyController;
use App\Http\Controllers\Main\CircleNewJoy\TodayCircleNewJoyController;
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

// サークル 
Route::get('/circle/newjoy', TodayCircleNewJoyController::class)->name('main.circleNewJoy.today');
Route::get('/circle/{slug}', GetCircleController::class)->name('main.circle.show');
Route::get('/circle/{slug}/newjoy', IndexCircleNewJoyController::class)->name('main.circleNewJoy.index');
Route::get('/circle/{slug}/newjoy/{circleNewJoyId}', ShowCircleNewJoyController::class)->name('main.circleNewJoy.show');
