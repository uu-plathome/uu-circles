<?php

use App\Http\Controllers\Circle\Auth\ForgotPasswordCircleController;
use App\Http\Controllers\Circle\Auth\LoginCircleController;
use App\Http\Controllers\Circle\Auth\ResetPasswordCircleController;
use App\Http\Controllers\Circle\Auth\ShowOwnCircleUserController;
use App\Http\Controllers\Circle\Auth\VerificationConfirmController;
use App\Http\Controllers\Circle\Auth\VerificationResendController;
use App\Http\Controllers\Circle\Auth\VerificationVerifyController;
use App\Http\Controllers\Circle\Circle\IndexCircleController;
use App\Http\Controllers\Circle\Circle\ShowCircleController;
use App\Http\Controllers\Circle\Circle\UpdateCircleController;
use App\Support\Arr;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:adminUser')->group(function () {
    Route::post('/login', LoginCircleController::class)->name('circle.auth.login');

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', VerificationVerifyController::class)->name('circle.verification.verify');
        Route::post('email/verify/{userId}', VerificationConfirmController::class);
        Route::post('email/resend', VerificationResendController::class)->name('circle.verification.resend');

        Route::post('password/reset', ForgotPasswordCircleController::class);
        Route::post('password/confirm', ResetPasswordCircleController::class)->name('circle.password.confirm');
    });
});

Route::middleware('auth:adminUser')->group(function () {
    Route::get('/user', ShowOwnCircleUserController::class);

    Route::get('/circle', IndexCircleController::class)->name('circle.circle.show');
    Route::get('/circle/{circleId}', ShowCircleController::class)->name('circle.circle.show');
    Route::put('/circle/{circleId}', UpdateCircleController::class)->name('circle.circle.update');
});
