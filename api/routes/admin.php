<?php

use App\Http\Controllers\Admin\AdminUser\DeleteAdminUserController;
use App\Http\Controllers\Admin\AdminUser\IndexAdminUserController;
use App\Http\Controllers\Admin\AdminUser\ShowAdminUserController;
use App\Http\Controllers\Admin\AdminUser\UpdateAdminUserController;
use App\Http\Controllers\Admin\Advertise\CreateAdvertiseController;
use App\Http\Controllers\Admin\Advertise\DeleteAdvertiseController;
use App\Http\Controllers\Admin\Advertise\DownloadAdvertiseCounterHistoryExcelController;
use App\Http\Controllers\Admin\Advertise\DownloadAdvertiseExcelController;
use App\Http\Controllers\Admin\Advertise\IndexAdvertiseController;
use App\Http\Controllers\Admin\Advertise\ShowAdvertiseController;
use App\Http\Controllers\Admin\Advertise\UpdateAdvertiseController;
use App\Http\Controllers\Admin\Announcement\CreateAnnouncementController;
use App\Http\Controllers\Admin\Announcement\DeleteAnnouncementController;
use App\Http\Controllers\Admin\Announcement\FixedAdminViewAnnouncementController;
use App\Http\Controllers\Admin\Announcement\IndexAnnouncementController;
use App\Http\Controllers\Admin\Announcement\ShowAnnouncementController;
use App\Http\Controllers\Admin\Announcement\UpdateAnnouncementController;
use App\Http\Controllers\Admin\Auth\ForgotPasswordAdminController;
use App\Http\Controllers\Admin\Auth\LoginAdminController;
use App\Http\Controllers\Admin\Auth\LogoutAdminController;
use App\Http\Controllers\Admin\Auth\RegisterAdminController;
use App\Http\Controllers\Admin\Auth\ResetPasswordAdminController;
use App\Http\Controllers\Admin\Auth\ShowOwnAdminUserController;
use App\Http\Controllers\Admin\Auth\VerificationConfirmController;
use App\Http\Controllers\Admin\Auth\VerificationResendController;
use App\Http\Controllers\Admin\Auth\VerificationVerifyController;
use App\Http\Controllers\Admin\Circle\CreateCircleController;
use App\Http\Controllers\Admin\Circle\DeleteCircleController;
use App\Http\Controllers\Admin\Circle\IndexCircleController;
use App\Http\Controllers\Admin\Circle\PaginateCircleController;
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
use App\Http\Controllers\Admin\AllUser\IndexAllUserController;
use App\Http\Controllers\Admin\CircleUser\IndexCircleUserByUserIdController;
use App\Http\Controllers\Admin\CircleUser\IndexCircleUserController;
use App\Http\Controllers\Admin\CircleUser\RegisterCircleUserController;
use App\Http\Controllers\Admin\CircleUser\ShowCircleUserController;
use App\Http\Controllers\Admin\CircleUser\UpdateCircleUserController;
use App\Http\Controllers\Admin\Storage\PutStorageController;

Route::middleware('throttle:60,1')->group(function () {
    Route::post('email/resend', VerificationResendController::class)->name('admin.verification.resend');
});

Route::group(['middleware' => 'guest:adminUser'], function () {
    Route::middleware('throttle:60,1')->group(function () {
        Route::post('/login', LoginAdminController::class)->name('admin.auth.login');
    });
    
    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', VerificationVerifyController::class)->name('admin.verification.verify');
        Route::post('email/verify/{userId}', VerificationConfirmController::class);

        Route::post('password/reset', ForgotPasswordAdminController::class);
        Route::post('password/confirm', ResetPasswordAdminController::class)->name('admin.password.confirm');
    });
});

Route::middleware('auth:adminUser')->group(function () {
    Route::get('/user', ShowOwnAdminUserController::class);
    Route::post('/logout', LogoutAdminController::class);

    // AdminUser 管理者アカウント
    Route::get('/admin-user', IndexAdminUserController::class);
    Route::post('/admin-user', RegisterAdminController::class)->name('admin.auth.register');
    Route::get('/admin-user/{userId}', ShowAdminUserController::class);
    Route::put('/admin-user/{userId}', UpdateAdminUserController::class);
    Route::delete('/admin-user/{userId}', DeleteAdminUserController::class);

    // Circle サークル管理
    Route::get('/circle', IndexCircleController::class);
    Route::get('/circle/paginate', PaginateCircleController::class);
    Route::post('/circle', CreateCircleController::class);
    Route::get('/circle/{id}', ShowCircleController::class);
    Route::put('/circle/{id}', UpdateCircleController::class);
    Route::delete('/circle/{id}', DeleteCircleController::class);

    // CircleUser サークルユーザー
    Route::get('/user/circle', IndexAllUserController::class);
    Route::get('/circle/{circleId}/user', IndexCircleUserController::class)->where('circleId', '[0-9]+');
    Route::post('/circle/{circleId}/user', RegisterCircleUserController::class)->where('circleId', '[0-9]+');
    Route::get('/circle/{circleId}/user/{userId}', ShowCircleUserController::class)->where('circleId', '[0-9]+');
    Route::put('/circle/{circleId}/user/{userId}', UpdateCircleUserController::class)->where('circleId', '[0-9]+');
    Route::delete('/circle/{circleId}/user/{userId}', DeleteCircleUserController::class)->where('circleId', '[0-9]+');
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

    // Advertise 広告管理
    Route::get('/advertise', IndexAdvertiseController::class);
    Route::post('/advertise', CreateAdvertiseController::class);
    Route::get('/advertise/download', DownloadAdvertiseExcelController::class);
    Route::get('/advertise/{id}', ShowAdvertiseController::class);
    Route::get('/advertise/{advertiseId}/download', DownloadAdvertiseCounterHistoryExcelController::class);
    Route::put('/advertise/{id}', UpdateAdvertiseController::class);
    Route::delete('/advertise/{id}', DeleteAdvertiseController::class);

    // Announcement お知らせ
    Route::get('/announcement', IndexAnnouncementController::class);
    Route::post('/announcement', CreateAnnouncementController::class);
    Route::get('/announcement/{announcementId}', ShowAnnouncementController::class)
        ->where('announcementId', '[0-9]+');
    Route::put('/announcement/{announcementId}', UpdateAnnouncementController::class)
        ->where('announcementId', '[0-9]+');
    Route::delete('/announcement/{announcementId}', DeleteAnnouncementController::class)
        ->where('announcementId', '[0-9]+');
    Route::get('/announcement/fixed', FixedAdminViewAnnouncementController::class);

    // Storage
    Route::post('/storage', PutStorageController::class);
});
