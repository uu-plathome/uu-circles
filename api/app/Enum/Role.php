<?php

declare(strict_types=1);

namespace App\Enum;

/**
 * 権限.
 */
final class Role
{
    /**
     * システム管理者.
     */
    const SYSTEM = 'SYSTEM';

    /**
     * AdminUser: 管理者
     * CircleUser: サークル部長.
     */
    const MANAGER = 'MANAGER';

    /**
     * 一般.
     */
    const COMMON = 'COMMON';
}
