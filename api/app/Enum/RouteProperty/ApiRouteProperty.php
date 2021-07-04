<?php

namespace App\Enum\RouteProperty;

class ApiRouteProperty
{
    // トップページ
    const MainIndex = 'main.index';
    // トップページ (デモ)
    const MainDemoIndex = 'main.index.demo';
    // サイトマップ
    const MainSitemap = 'main.sitemap';
    // 統計
    const MainStatistics = 'main.statistics';
    // 広告
    const MainAdvertises = 'main.advertises';

    // サークル一覧
    const MainCircleList = 'main.circle.list';
    const MainSearchWord = 'main.circle.search.word';
    const MainSearchByCategory = 'main.circle.search.category';
    const MainSearchByTag = 'main.circle.search.tag';

    // サークル詳細
    const MainCircleShow = 'main.circle.show';

    // 今日の新歓
    const MainCircleNewJoyToday = 'main.circleNewJoy.today';
    // 今日の新歓 (デモ)
    const MainCircleNewJoyTodayDemo = 'main.circleNewJoy.today.demo';

    // 新歓
    const MainCircleNewJoyIndex = 'main.circleNewJoy.index';
    const MainCircleNewJoyShow = 'main.circleNewJoy.show';

    // デモ新歓
    const MainDemoCircleNewJoyIndex = 'main.circleNewJoy.demo.index';
    const MainDemoCircleNewJoyShow = 'main.circleNewJoy.demo.show';

    // ガチャ
    const MainGachaPickup = 'main.gacha.pickup';
    const MainGachaDraw = 'main.gacha.draw';
    const MainGachaResult = 'main.gacha.result';

    // 識別子
    const MainIdentificationPublish = 'main.identification.publish';
    const MainIdentificationCheck = 'main.identification.check';
}
