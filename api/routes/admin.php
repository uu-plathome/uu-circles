<?php

use App\Support\Arr;
use Illuminate\Http\Request;

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('/login', 'Admin\Auth\LoginAdminController')->name('admin.auth.login');
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return Arr::camel_keys($request->user()->toArray());
    });

    Route::get('/admin-user', 'Admin\AdminUser\IndexAdminUserController');
    Route::post('/admin-user', 'Admin\Auth\RegisterAdminController')->name('admin.auth.register');

    // Circle サークル管理
    Route::get('/circle', 'Admin\Circle\IndexCircleController');
    Route::post('/circle', 'Admin\Circle\CreateCircleController');
    Route::get('/circle/{id}', 'Admin\Circle\ShowCircleController');
    Route::put('/circle/{id}', 'Admin\Circle\UpdateCircleController');

    // CircleNewJoy サークル新歓管理
    Route::get('/circle/{id}/newjoy', 'Admin\CircleNewJoy\IndexCircleNewJoyController');
    Route::post('/circle/{id}/newjoy', 'Admin\CircleNewJoy\RegisterCircleNewJoyController');
    Route::get('/circle/{id}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\ShowCircleNewJoyController');
    Route::put('/circle/{id}/newjoy/{circleNewJoyId}', 'Admin\CircleNewJoy\UpdateCircleNewJoyController');
});
