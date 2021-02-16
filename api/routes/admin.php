<?php

use App\Http\Controllers\Admin\AdminUser\DeleteAdminUserController;
use App\Http\Controllers\Admin\AdminUser\IndexAdminUserController;
use App\Http\Controllers\Admin\AdminUser\ShowAdminUserController;
use App\Http\Controllers\Admin\AdminUser\UpdateAdminUserController;
use App\Http\Controllers\Admin\Advertise\CreateAdvertiseController;
use App\Http\Controllers\Admin\Advertise\DeleteAdvertiseController;
use App\Http\Controllers\Admin\Advertise\IndexAdvertiseController;
use App\Http\Controllers\Admin\Advertise\ShowAdvertiseController;
use App\Http\Controllers\Admin\Advertise\UpdateAdvertiseController;
use App\Http\Controllers\Admin\Auth\ForgotPasswordAdminController;
use App\Http\Controllers\Admin\Auth\LoginAdminController;
use App\Http\Controllers\Admin\Auth\RegisterAdminController;
use App\Http\Controllers\Admin\Auth\ResetPasswordAdminController;
use App\Http\Controllers\Admin\Auth\VerificationConfirmController;
use App\Http\Controllers\Admin\Auth\VerificationResendController;
use App\Http\Controllers\Admin\Auth\VerificationVerifyController;
use App\Http\Controllers\Admin\Circle\CreateCircleController;
use App\Http\Controllers\Admin\Circle\IndexCircleController;
use App\Http\Controllers\Admin\Circle\ShowCircleController;
use App\Http\Controllers\Admin\Circle\UpdateCircleController;
use App\Http\Controllers\Admin\CircleNewJoy\CopyCircleNewJoyController;
use App\Http\Controllers\Admin\CircleNewJoy\DeleteCircleNewJoyController;
use App\Http\Controllers\Admin\CircleNewJoy\IndexCircleNewJoyController;
use App\Http\Controllers\Admin\CircleNewJoy\RegisterCircleNewJoyController;
use App\Http\Controllers\Admin\CircleNewJoy\ShowCircleNewJoyController;
use App\Http\Controllers\Admin\CircleNewJoy\UpdateCircleNewJoyController;
use App\Http\Controllers\Admin\CircleTag\CreateOrUpdateCircleTagController;
use App\Http\Controllers\Admin\CircleTag\GetCircleTagController;
use App\Http\Controllers\Admin\CircleUser\CreateCircleUserRelationController;
use App\Http\Controllers\Admin\CircleUser\DeleteCircleUserController;
use App\Http\Controllers\Admin\CircleUser\DeleteCircleUserRelationController;
use App\Http\Controllers\Admin\CircleUser\IndexCircleUserByUserIdController;
use App\Http\Controllers\Admin\CircleUser\IndexCircleUserController;
use App\Http\Controllers\Admin\CircleUser\RegisterCircleUserController;
use App\Http\Controllers\Admin\CircleUser\ShowCircleUserController;
use App\Http\Controllers\Admin\CircleUser\UpdateCircleUserController;
use App\Http\Controllers\Admin\PutStorageController;
use App\Support\Arr;
use Illuminate\Http\Request;

Route::post('email/resend', VerificationResendController::class)->name('admin.verification.resend');

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('/login', LoginAdminController::class)->name('admin.auth.login');

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', VerificationVerifyController::class)->name('admin.verification.verify');
        Route::post('email/verify/{userId}', VerificationConfirmController::class);

        Route::post('password/reset', ForgotPasswordAdminController::class);
        Route::post('password/confirm', ResetPasswordAdminController::class)->name('admin.password.confirm');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return Arr::camel_keys($request->user()->toArray());
    });

    // AdminUser 管理者アカウント
    Route::get('/admin-user', IndexAdminUserController::class);
    Route::post('/admin-user', RegisterAdminController::class)->name('admin.auth.register');
    Route::get('/admin-user/{userId}', ShowAdminUserController::class);
    Route::put('/admin-user/{userId}', UpdateAdminUserController::class);
    Route::delete('/admin-user/{userId}', DeleteAdminUserController::class);

    // Circle サークル管理
    Route::get('/circle', IndexCircleController::class);
    Route::post('/circle', CreateCircleController::class);
    Route::get('/circle/{id}', ShowCircleController::class);
    Route::put('/circle/{id}', UpdateCircleController::class);

    // CircleUser サークルユーザー
    Route::get('/circle/{circleId}/user', IndexCircleUserController::class);
    Route::post('/circle/{circleId}/user', RegisterCircleUserController::class);
    Route::get('/circle/{circleId}/user/{userId}', ShowCircleUserController::class);
    Route::put('/circle/{circleId}/user/{userId}', UpdateCircleUserController::class);
    Route::delete('/circle/{circleId}/user/{userId}', DeleteCircleUserController::class);
    Route::get('/circle-user/{userId}', IndexCircleUserByUserIdController::class);
    Route::post('/circle-user/{userId}/{circleId}', CreateCircleUserRelationController::class);
    Route::delete('/circle-user/{userId}/{circleId}', DeleteCircleUserRelationController::class);

    // CircleNewJoy サークル新歓管理
    Route::get('/circle/{circleId}/newjoy', IndexCircleNewJoyController::class);
    Route::post('/circle/{circleId}/newjoy', RegisterCircleNewJoyController::class);
    Route::get('/circle/{circleId}/newjoy/{circleNewJoyId}', ShowCircleNewJoyController::class);
    Route::put('/circle/{circleId}/newjoy/{circleNewJoyId}', UpdateCircleNewJoyController::class);
    Route::delete('/circle/{circleId}/newjoy/{circleNewJoyId}', DeleteCircleNewJoyController::class);
    Route::post('/circle/{circleId}/newjoy/{circleNewJoyId}/copy', CopyCircleNewJoyController::class);

    // CircleTag サークルタグ管理
    Route::get('/circle/{circleId}/tag', GetCircleTagController::class);
    Route::post('/circle/{circleId}/tag', CreateOrUpdateCircleTagController::class);


    // Advertise
    Route::get('/advertise', IndexAdvertiseController::class);
    Route::post('/advertise', CreateAdvertiseController::class);
    Route::get('/advertise/{id}', ShowAdvertiseController::class);
    Route::put('/advertise/{id}', UpdateAdvertiseController::class);
    Route::delete('/advertise/{id}', DeleteAdvertiseController::class);

    // Storage
    Route::post('/storage', PutStorageController::class);
});
