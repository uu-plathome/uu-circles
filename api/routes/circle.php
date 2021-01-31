<?php

Route::middleware('guest:api')->group(function () {
    Route::middleware('throttle:6,1')->group(function () {
        Route::get('email/verify/{userId}', 'Circle\Auth\VerificationVerifyController')->name('circle.verification.verify');
        Route::post('email/verify/{userId}', 'Circle\Auth\VerificationConfirmController');
        Route::post('email/resend', 'Circle\Auth\VerificationResendController')->name('circle.verification.resend');
    });
});
