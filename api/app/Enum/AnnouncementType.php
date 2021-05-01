<?php

namespace App\Enum;

/**
 * お知らせ種類
 */
class AnnouncementType
{
    /**
     * メンテナンス
     */
    const MAINTENANCE = 'MAINTENANCE';
    /**
     * アップデート
     */
    const UPDATE_FEATURE = 'UPDATE_FEATURE';
    /**
     * 不具合
     */
    const BUG = 'BUG';
    /**
     * 新着サークル
     */
    const NEW_CIRCLE = 'NEW_CIRCLE';
    /**
     * イベント
     */
    const EVENT = 'EVENT';
    /**
     * アンケート
     */
    const QUESTIONNAIRE = 'QUESTIONNAIRE';
    /**
     * 広告
     */
    const ADVERTISE = 'ADVERTISE';
    /**
     * uu-yell
     */
    const UU_YELL = 'UU_YELL';
}
