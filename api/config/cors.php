<?php
return [

    /*
    * CORSヘッダーを出力するパスのパターン、任意でワイルドカード(*)が利用できる。
    * 空だと一切のルートで機能しない。
    * Example: ['api/*']
    *   全てのルートを対象にする場合: ['*']
    *   APIと特定の画像を対象にする例: ['api/*', 'resources/example.png']
    */
    'paths' => [
        'api/*',
        'admin/api/*',
        'circle/api/*',
    ],

    /*
    * マッチするHTTPメソッド。 `[*]` だと全てのリクエストにマッチする。
    * GETとPOSTだけを許可する場合: ['GET', 'POST']
    */
    'allowed_methods' => ['*'],

    /*
    * マッチするOrigin。`*`かオリジンに完全一致、またはワイルドカードが利用可。
    * '*', allowed_origins(完全一致), allowed_origins_patterns, allowed_origins(ワイルドカード)の順に評価されることになる。
    *  `[*]`にすると全てのオリジンで許可。
    * example.comとそのサブドメインを許可: ['https://example.com', 'https://*.example.com']
    */
    'allowed_origins' => [
        env('CLIENT_URL', 'http://localhost:3000'),
        env('CIRCLE_URL', 'http://localhost:3001'),
        env('ADMIN_URL', 'http://localhost:3002'),
    ],

    /*
    * Matches the request origin with, similar to `Request::is()`
    * 正規表現によるオリジン指定。preg_matchの引数としてそのまま渡される。
    * 例: ['#\Ahttps?://.+\.example\.com\z#']
    */
    'allowed_origins_patterns' => [],

    /*
    * Sets the Access-Control-Allow-Headers response header. `[*]` allows all headers.
    */
    'allowed_headers' => ['*'],

    /*
    *  Access-Control-Expose-Headers レスポンスヘッダーを指定する。 false or string[]
    */
    'exposed_headers' => false,

    /*
    * Access-Control-Max-Age レスポンスヘッダーを指定する。`false` or int
    * 600を指定すれば600秒このヘッダーがキャッシュされpreflightリクエストを減らせる。
    */
    'max_age' => false,

    /*
    * Sets the Access-Control-Allow-Credentials header. bool (falsy値を指定すると出力せず、truthyな値を渡せばtrueが出力されるが)
    */
    'supports_credentials' => true,
];
