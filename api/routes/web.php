<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\Main\Advertise\RedirectToAdvertiseLinkController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/share/advertise/{slug}', RedirectToAdvertiseLinkController::class);
