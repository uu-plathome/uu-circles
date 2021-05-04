<?php

namespace Tests\Unit\App\Models;

use App\Models\CircleInformation;
use PHPUnit\Framework\TestCase;

class CircleInformationTest extends TestCase
{
    /**
     * @dataProvider formatTwitterUrlProvider
     */
    public function testFormatTwitterUrl($arg, $expected)
    {
        $this->assertEquals($expected, CircleInformation::formatTwitterUrl($arg));
    }

    public function formatTwitterUrlProvider(): array
    {
        return [
            '正常値'             => ['https://twitter.com/ulab_uu', 'https://twitter.com/ulab_uu'],
            'mobile値'           => ['https://mobile.twitter.com/ulab_uu', 'https://twitter.com/ulab_uu'],
            'クエリパラメータの削除' => ['https://twitter.com/ulab_uu?s=1', 'https://twitter.com/ulab_uu'],
            'クエリパラメータの削除' => ['https://twitter.com/ulab_uu?s=1&a=1', 'https://twitter.com/ulab_uu'],
            'mobile値とクエリパラメータの削除' => ['https://mobile.twitter.com/ulab_uu?s=1&a=1', 'https://twitter.com/ulab_uu'],
            'httpをhttpsにする' => ['http://mobile.twitter.com/ulab_uu', 'https://twitter.com/ulab_uu'],
            'httpをhttpsにする' => ['http://mobile.twitter.com/ulab_uu?s=1&a=1', 'https://twitter.com/ulab_uu'],
            'nullはnull' => [null, null],
            '空文字はnull' => ['', null],
        ];
    }
}
