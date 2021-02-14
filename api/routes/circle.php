<?php

use App\Http\Controllers\Circle\Auth\ForgotPasswordCircleController;
use App\Http\Controllers\Circle\Auth\LoginCircleController;
use App\Http\Controllers\Circle\Auth\ResetPasswordCircleController;
use App\Http\Controllers\Circle\Auth\VerificationConfirmController;
use App\Http\Controllers\Circle\Auth\VerificationResendController;
use App\Http\Controllers\Circle\Auth\VerificationVerifyController;
use App\Support\Arr;
use Illuminate\Http\Request;

Route::middleware('guest:api')->group(function () {
    Route::post('/login', LoginCircleController::class)->name('circle.auth.login');

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', VerificationVerifyController::class)->name('circle.verification.verify');
        Route::post('email/verify/{userId}', VerificationConfirmController::class);
        Route::post('email/resend', VerificationResendController::class)->name('circle.verification.resend');

        Route::post('password/reset', ForgotPasswordCircleController::class);
        Route::post('password/confirm', ResetPasswordCircleController::class)->name('circle.password.confirm');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return Arr::camel_keys($request->user()->toArray());
    });
});
