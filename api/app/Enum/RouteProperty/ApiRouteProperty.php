<?php

namespace App\Enum\RouteProperty;

class ApiRouteProperty
{
    // トップページ
    const MainIndex = 'main.index';
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

    // 新歓
    const MainCircleNewJoyIndex = 'main.circleNewJoy.index';
    const MainCircleNewJoyShow = 'main.circleNewJoy.show';

    // ガチャ
    const MainGachaPickup = 'main.gacha.pickup';
    const MainGachaDraw = 'main.gacha.draw';
    const MainGachaResult = 'main.gacha.result';
    const MainGachaHistory = 'main.gacha.history';

    // 識別子
    const MainIdentificationPublish = 'main.identification.publish';
    const MainIdentificationCheck = 'main.identification.check';
}
