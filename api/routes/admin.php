<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->group(function () {
    Route::post('/register', 'Admin\Auth\RegisterAdminController')->name('admin.auth.register');

    Route::get('/register', function (Request $request) {
        return $request->user();
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
