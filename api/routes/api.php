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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('guest:api')->group(function () {
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');

    Route::middleware('throttle:6,1')->group(function () {
        Route::get('email/verify/{userId}', 'Auth\VerificationVerifyController')->name('verification.verify');
        Route::post('email/verify/{userId}', 'Auth\VerificationConfirmController');
        Route::post('email/resend', 'Auth\VerificationResendController')->name('verification.resend');
    });
});
