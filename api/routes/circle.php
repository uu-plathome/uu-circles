<?php

use App\Support\Arr;
use Illuminate\Http\Request;

Route::middleware('guest:api')->group(function () {
    Route::post('/login', 'Circle\Auth\LoginCircleController')->name('circle.auth.login');

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', 'Circle\Auth\VerificationVerifyController')->name('circle.verification.verify');
        Route::post('email/verify/{userId}', 'Circle\Auth\VerificationConfirmController');
        Route::post('email/resend', 'Circle\Auth\VerificationResendController')->name('circle.verification.resend');

        Route::post('password/reset', 'Circle\Auth\ForgotPasswordCircleController');
        Route::post('password/confirm', 'Circle\Auth\ResetPasswordCircleController')->name('circle.password.confirm');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return Arr::camel_keys($request->user()->toArray());
    });
});
