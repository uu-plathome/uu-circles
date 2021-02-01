<?php

use App\Support\Arr;
use Illuminate\Http\Request;

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('/login', 'Admin\Auth\LoginAdminController')->name('admin.auth.login');

    Route::middleware('throttle:6,1')->group(function () {
        Route::get('email/verify/{userId}', 'Admin\Auth\VerificationVerifyController')->name('admin.verification.verify');
        Route::post('email/verify/{userId}', 'Admin\Auth\VerificationConfirmController');
        Route::post('email/resend', 'Admin\Auth\VerificationResendController')->name('admin.verification.resend');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return Arr::camel_keys($request->user()->toArray());
    });

    // AdminUser 管理者アカウント
    Route::get('/admin-user', 'Admin\AdminUser\IndexAdminUserController');
    Route::post('/admin-user', 'Admin\Auth\RegisterAdminController')->name('admin.auth.register');
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
    Route::get('/circle/{id}/newjoy', 'Admin\CircleNewJoy\IndexCircleNewJoyController');
    Route::post('/circle/{id}/newjoy', 'Admin\CircleNewJoy\RegisterCircleNewJoyController');
    Route::get('/circle/{id}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\ShowCircleNewJoyController');
    Route::put('/circle/{id}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\UpdateCircleNewJoyController');
    Route::delete('/circle/{id}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\DeleteCircleNewJoyController');

    // Storage
    Route::post('/storage', 'Admin\PutStorageController');
});
