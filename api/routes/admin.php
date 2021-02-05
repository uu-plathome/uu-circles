<?php

use App\Support\Arr;
use Illuminate\Http\Request;

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('/login', 'Admin\Auth\LoginAdminController')->name('admin.auth.login');

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', 'Admin\Auth\VerificationVerifyController')->name('admin.verification.verify');
        Route::post('email/verify/{userId}', 'Admin\Auth\VerificationConfirmController');
        Route::post('email/resend', 'Admin\Auth\VerificationResendController')->name('admin.verification.resend');

        Route::post('password/reset', 'Admin\Auth\ForgotPasswordAdminController');
        Route::post('password/confirm', 'Admin\Auth\ResetPasswordAdminController')->name('admin.password.confirm');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return Arr::camel_keys($request->user()->toArray());
    });

    // AdminUser 管理者アカウント
    Route::get('/admin-user', 'Admin\AdminUser\IndexAdminUserController');
    Route::post('/admin-user', 'Admin\Auth\RegisterAdminController')->name('admin.auth.register');
    Route::get('/admin-user/{userId}', 'Admin\AdminUser\ShowAdminUserController');
    Route::put('/admin-user/{userId}', 'Admin\AdminUser\UpdateAdminUserController');
    Route::delete('/admin-user/{userId}', 'Admin\AdminUser\DeleteAdminUserController');

    // Circle サークル管理
    Route::get('/circle', 'Admin\Circle\IndexCircleController');
    Route::post('/circle', 'Admin\Circle\CreateCircleController');
    Route::get('/circle/{id}', 'Admin\Circle\ShowCircleController');
    Route::put('/circle/{id}', 'Admin\Circle\UpdateCircleController');

    // CircleUser サークルユーザー
    Route::get('/circle/{circleId}/user', 'Admin\CircleUser\IndexCircleUserController');
    Route::post('/circle/{circleId}/user', 'Admin\CircleUser\RegisterCircleUserController');
    Route::get('/circle/{circleId}/user/{userId}', 'Admin\CircleUser\ShowCircleUserController');
    Route::put('/circle/{circleId}/user/{userId}', 'Admin\CircleUser\UpdateCircleUserController');
    Route::delete('/circle/{circleId}/user/{userId}', 'Admin\CircleUser\DeleteCircleUserController');

    // CircleNewJoy サークル新歓管理
    Route::get('/circle/{circleId}/newjoy', 'Admin\CircleNewJoy\IndexCircleNewJoyController');
    Route::post('/circle/{circleId}/newjoy', 'Admin\CircleNewJoy\RegisterCircleNewJoyController');
    Route::get('/circle/{circleId}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\ShowCircleNewJoyController');
    Route::put('/circle/{circleId}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\UpdateCircleNewJoyController');
    Route::delete('/circle/{circleId}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\DeleteCircleNewJoyController');
    Route::post('/circle/{circleId}/newjoy/{circleNewJoyId}/copy', 'Admin\CircleNewJoy\CopyCircleNewJoyController');

    // Storage
    Route::post('/storage', 'Admin\PutStorageController');
});
