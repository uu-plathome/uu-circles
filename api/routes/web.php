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

use App\Enum\RouteProperty\WebRouteProperty as RP;
use App\Http\Controllers\Main\Advertise;
use App\Http\Controllers\Main\Announcement;
use App\Http\Controllers\Main\Main;

Route::get('/', Main\WelcomeController::class)
    ->name(RP::Welcome);

Route::get('/share/advertise/{slug}', Advertise\RedirectToAdvertiseLinkController::class)
    ->name(RP::WebShareAdvertiseShow);
Route::get('/share/announcement/{slug}', Announcement\RedirectToAnnouncementLinkController::class)
    ->name(RP::WebShareAnnouncementShow);
