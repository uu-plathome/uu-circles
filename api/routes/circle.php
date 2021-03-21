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
use App\Http\Controllers\Circle\CircleNewJoy\DeleteCircleNewJoyController;
use App\Http\Controllers\Circle\CircleNewJoy\IndexCircleNewJoyController;
use App\Http\Controllers\Circle\CircleNewJoy\RegisterCircleNewJoyController;
use App\Http\Controllers\Circle\CircleNewJoy\ShowCircleNewJoyController;
use App\Http\Controllers\Circle\CircleNewJoy\UpdateCircleNewJoyController;
use App\Http\Controllers\Circle\CircleUser\IndexCircleUserController;
use App\Http\Controllers\Circle\CircleUser\RegisterCircleUserController;
use App\Http\Controllers\Circle\CircleUser\UpdateCircleUserController;
use App\Http\Controllers\Circle\User\UpdateOwnUserController;
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
    Route::put('/user', UpdateOwnUserController::class);

    // サークル一覧
    Route::get('/circle', IndexCircleController::class)->name('circle.circle.show');
    Route::get('/circle/{circleId}', ShowCircleController::class)->name('circle.circle.show');
    Route::put('/circle/{circleId}', UpdateCircleController::class)->name('circle.circle.update');

    // 新歓
    Route::get('/circle/{circleId}/newjoy', IndexCircleNewJoyController::class)->name('circle.circleNewJoy.index');
    Route::post('/circle/{circleId}/newjoy', RegisterCircleNewJoyController::class)->name('circle.circleNewJoy.register');
    Route::get('/circle/{circleId}/newjoy/{circleNewJoyId}', ShowCircleNewJoyController::class)->name('circle.circleNewJoy.show');
    Route::put('/circle/{circleId}/newjoy/{circleNewJoyId}', UpdateCircleNewJoyController::class)->name('circle.circleNewJoy.update');
    Route::delete('/circle/{circleId}/newjoy/{circleNewJoyId}', DeleteCircleNewJoyController::class)->name('circle.circleNewJoy.delete');

    // 部員アカウント
    Route::get('/circle/{circleId}/user', IndexCircleUserController::class)->name('circle.circleUser.index');
    Route::post('/circle/{circleId}/user', RegisterCircleUserController::class)->name('circle.circleUser.register');
    Route::put('/circle/{circleId}/user/{userId}', UpdateCircleUserController::class)->name('circle.circleUser.update');
});
