<?php

return [
    // Webhook URL
    'url' => env('SLACK_URL'),

    // チャンネル設定
    'default' => 'delete',

    'channels' => [
        'delete' => [
            'username' => '削除通知',
            'icon'     => ':face_with_rolling_eyes:',
            'channel'  => 'p_サークルビラ一覧_api',
        ],

        // 'error' => [
        //     'username' => 'エラー通知',
        //     'icon' => ':scream:',
        //     'channel' => 'notice-error',
        // ],
    ],
];
