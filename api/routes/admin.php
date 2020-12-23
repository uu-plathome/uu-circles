<?php

use Illuminate\Http\Request;

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('/login', 'Admin\Auth\LoginAdminController')->name('admin.auth.login');
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/register', 'Admin\Auth\RegisterAdminController')->name('admin.auth.register');
});
