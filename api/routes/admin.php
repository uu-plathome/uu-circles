<?php

use App\Enum\RouteProperty\AdminRouteProperty as ARP;
use App\Http\Controllers\Admin\AdminUser;
use App\Http\Controllers\Admin\Advertise;
use App\Http\Controllers\Admin\AllUser;
use App\Http\Controllers\Admin\Announcement;
use App\Http\Controllers\Admin\Auth;
use App\Http\Controllers\Admin\Circle;
use App\Http\Controllers\Admin\CircleNewJoy;
use App\Http\Controllers\Admin\CircleTag;
use App\Http\Controllers\Admin\CircleUser;
use App\Http\Controllers\Admin\DemoCircleNewJoy;
use App\Http\Controllers\Admin\Storage;

Route::middleware('throttle:60,1')->group(function () {
    Route::post('email/resend', Auth\VerificationResendController::class)->name('admin.verification.resend');
});

Route::group(['middleware' => 'guest:adminUser'], function () {
    Route::middleware('throttle:60,1')->group(function () {
        Route::post('/login', Auth\LoginAdminController::class)->name('admin.auth.login');
    });

    Route::middleware('throttle:30,1')->group(function () {
        Route::get('email/verify/{userId}', Auth\VerificationVerifyController::class)
            ->name('admin.verification.verify');
        Route::post('email/verify/{userId}', Auth\VerificationConfirmController::class);

        Route::post('password/reset', Auth\ForgotPasswordAdminController::class);
        Route::post('password/confirm', Auth\ResetPasswordAdminController::class)->name('admin.password.confirm');
    });
});

Route::middleware('auth:adminUser')->group(function () {
    Route::get('/user', Auth\ShowOwnAdminUserController::class);
    Route::post('/logout', Auth\LogoutAdminController::class);

    // AdminUser 管理者アカウント
    Route::get('/admin-user', AdminUser\IndexAdminUserController::class)
        ->name(ARP::AdminAdminUserIndex);
    Route::post('/admin-user', Auth\RegisterAdminController::class)
        ->name(ARP::AdminAdminUserRegister);
    Route::get('/admin-user/{userId}', AdminUser\ShowAdminUserController::class)
        ->name(ARP::AdminAdminUserShow)
        ->where('userId', '[0-9]+');
    Route::put('/admin-user/{userId}', AdminUser\UpdateAdminUserController::class)
        ->name(ARP::AdminAdminUserUpdate)
        ->where('userId', '[0-9]+');
    Route::delete('/admin-user/{userId}', AdminUser\DeleteAdminUserController::class)
        ->name(ARP::AdminAdminUserDelete)
        ->where('userId', '[0-9]+');

    // Circle サークル管理
    Route::get('/circle', Circle\IndexCircleController::class)
        ->name(ARP::AdminCircleIndex);
    Route::get('/circle/paginate', Circle\PaginateCircleController::class)
        ->name(ARP::AdminCirclePaginate);
    Route::post('/circle', Circle\CreateCircleController::class)
        ->name(ARP::AdminCircleRegister);
    Route::get('/circle/{circleId}', Circle\ShowCircleController::class)
        ->name(ARP::AdminCircleShow)
        ->where('circleId', '[0-9]+');
    Route::put('/circle/{circleId}', Circle\UpdateCircleController::class)
        ->name(ARP::AdminCircleUpdate)
        ->where('circleId', '[0-9]+');
    Route::delete('/circle/{circleId}', Circle\DeleteCircleController::class)
        ->name(ARP::AdminCircleDelete)
        ->where('circleId', '[0-9]+');

    // CircleUser サークルユーザー
    Route::get('/user/circle', AllUser\IndexAllUserController::class);
    Route::get('/circle/{circleId}/user', CircleUser\IndexCircleUserController::class)
        ->where('circleId', '[0-9]+');
    Route::post('/circle/{circleId}/user', CircleUser\RegisterCircleUserController::class)
        ->where('circleId', '[0-9]+');
    Route::get('/circle/{circleId}/user/{userId}', CircleUser\ShowCircleUserController::class)
        ->where('circleId', '[0-9]+')
        ->where('userId', '[0-9]+');
    Route::put('/circle/{circleId}/user/{userId}', CircleUser\UpdateCircleUserController::class)
        ->where('circleId', '[0-9]+')
        ->where('userId', '[0-9]+');
    Route::delete('/circle/{circleId}/user/{userId}', CircleUser\DeleteCircleUserController::class)
        ->where('circleId', '[0-9]+')
        ->where('userId', '[0-9]+');
    Route::get('/circle-user/{userId}', CircleUser\IndexCircleUserByUserIdController::class)
        ->where('userId', '[0-9]+');
    Route::post('/circle-user/{userId}/{circleId}', CircleUser\CreateCircleUserRelationController::class)
        ->where('circleId', '[0-9]+')
        ->where('userId', '[0-9]+');
    Route::delete('/circle-user/{userId}/{circleId}', CircleUser\DeleteCircleUserRelationController::class)
        ->where('circleId', '[0-9]+')
        ->where('userId', '[0-9]+');

    // CircleNewJoy サークル新歓管理
    Route::get('/circle/{circleId}/newjoy', CircleNewJoy\IndexCircleNewJoyController::class)
        ->where('circleId', '[0-9]+');
    Route::post('/circle/{circleId}/newjoy', CircleNewJoy\RegisterCircleNewJoyController::class)
        ->where('circleId', '[0-9]+');
    Route::get('/circle/{circleId}/newjoy/{circleNewJoyId}', CircleNewJoy\ShowCircleNewJoyController::class)
        ->where('circleId', '[0-9]+')
        ->where('circleNewJoyId', '[0-9]+');
    Route::put('/circle/{circleId}/newjoy/{circleNewJoyId}', CircleNewJoy\UpdateCircleNewJoyController::class)
        ->where('circleId', '[0-9]+')
        ->where('circleNewJoyId', '[0-9]+');
    Route::delete('/circle/{circleId}/newjoy/{circleNewJoyId}', CircleNewJoy\DeleteCircleNewJoyController::class)
        ->where('circleId', '[0-9]+')
        ->where('circleNewJoyId', '[0-9]+');
    Route::post('/circle/{circleId}/newjoy/{circleNewJoyId}/copy', CircleNewJoy\CopyCircleNewJoyController::class)
        ->where('circleId', '[0-9]+')
        ->where('circleNewJoyId', '[0-9]+');

    // DemoCircleNewJoy デモサークル新歓管理
    Route::get('/circle/demo/newjoy', DemoCircleNewJoy\IndexDemoCircleNewJoyController::class);
    Route::post('/circle/{circleId}/demo/newjoy', DemoCircleNewJoy\RegisterDemoCircleNewJoyController::class)
        ->where('circleId', '[0-9]+');
    Route::get(
        '/circle/demo/newjoy/{demoCircleNewJoyId}',
        DemoCircleNewJoy\ShowDemoCircleNewJoyController::class
    )
        ->where('demoCircleNewJoyId', '[0-9]+');
    Route::put(
        '/circle/demo/newjoy/{demoCircleNewJoyId}',
        DemoCircleNewJoy\UpdateDemoCircleNewJoyController::class
    )
        ->where('demoCircleNewJoyId', '[0-9]+');

    // CircleTag サークルタグ管理
    Route::get('/circle/{circleId}/tag', CircleTag\GetCircleTagController::class);
    Route::post('/circle/{circleId}/tag', CircleTag\CreateOrUpdateCircleTagController::class);

    // Advertise 広告管理
    Route::get('/advertise', Advertise\IndexAdvertiseController::class);
    Route::post('/advertise', Advertise\CreateAdvertiseController::class);
    Route::get('/advertise/download', Advertise\DownloadAdvertiseExcelController::class);
    Route::get('/advertise/{id}', Advertise\ShowAdvertiseController::class)
        ->where('id', '[0-9]+');
    Route::get('/advertise/{advertiseId}/download', Advertise\DownloadAdvertiseCounterHistoryExcelController::class);
    Route::put('/advertise/{id}', Advertise\UpdateAdvertiseController::class)
        ->where('id', '[0-9]+');
    Route::delete('/advertise/{id}', Advertise\DeleteAdvertiseController::class)
        ->where('id', '[0-9]+');

    // Announcement お知らせ
    Route::get('/announcement', Announcement\IndexAnnouncementController::class);
    Route::post('/announcement', Announcement\CreateAnnouncementController::class);
    Route::get('/announcement/{announcementId}', Announcement\ShowAnnouncementController::class)
        ->where('announcementId', '[0-9]+');
    Route::put('/announcement/{announcementId}', Announcement\UpdateAnnouncementController::class)
        ->where('announcementId', '[0-9]+');
    Route::delete('/announcement/{announcementId}', Announcement\DeleteAnnouncementController::class)
        ->where('announcementId', '[0-9]+');
    Route::get('/announcement/fixed', Announcement\FixedAdminViewAnnouncementController::class);

    // Storage
    Route::post('/storage', Storage\PutStorageController::class);
});
