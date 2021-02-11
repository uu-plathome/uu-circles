<?php

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
Route::get('/main', 'Main\Main\IndexController')->name('main.index');

// サークル 
Route::get('/circle/{slug}', 'Main\Circle\GetCircleController')->name('main.circle.show');
Route::get('/circle/{slug}/newjoy', 'Main\CircleNewJoy\IndexCircleNewJoyController')->name('main.circleNewJoy.index');
