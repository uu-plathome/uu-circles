<?php

namespace App\Enum\RouteProperty;

class AdminRouteProperty
{
    // 管理者ユーザー
    const AdminAdminUserIndex = 'admin.admin-user.index';
    const AdminAdminUserRegister = 'admin.admin-user.register';
    const AdminAdminUserShow = 'admin.admin-user.show';
    const AdminAdminUserUpdate = 'admin.admin-user.update';
    const AdminAdminUserDelete = 'admin.admin-user.delete';

    // サークル
    const AdminCircleIndex = 'admin.circle.index';
    const AdminCirclePaginate = 'admin.circle.paginate';
    const AdminCircleRegister = 'admin.circle.register';
    const AdminCircleShow = 'admin.circle.show';
    const AdminCircleUpdate = 'admin.circle.update';
    const AdminCircleDelete = 'admin.circle.delete';
    const AdminCircleDownload = 'admin.circle.download';
}
