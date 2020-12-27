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

    Route::post('/register', 'Admin\Auth\RegisterAdminController')->name('admin.auth.register');

    Route::get('/circle', 'Admin\Circle\IndexCircleController');
    Route::post('/circle', 'Admin\Circle\CreateCircleController');
});
