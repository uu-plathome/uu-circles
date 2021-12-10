<?php

declare(strict_types=1);

namespace Tests\Feature\Usecases\Main\Circle;

use App\Models\Circle;
use App\Usecases\Main\Circle\GetRandomCircleWithMainFixedUsecase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class GetRandomCircleWithMainFixedUsecaseTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info('GetRandomCircleWithMainFixedUsecaseTest');
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す.
     *
     * @var bool
     */
    protected $seed = true;

    /**
     * デモサークルが表示されていないことを確認するテスト
     */
    public function testInvokeWithIsOnlyDemoCircle()
    {
        Log::info('GetRandomCircleWithMainFixedUsecaseTest testInvokeWithIsOnlyDemoCircle');

        // GIVEN
        // 全てのサークルをデモサークルにする
        /** @var Circle $circle */
        $circle = Circle::get();
        $circle->is_only_demo = true;
        $circle->save();

        // デモサークルではないものが存在しないことを確認
        $this->assertFalse(Circle::whereIsOnlyDemo(false)->exists());

        // WHEN
        $actual = (new GetRandomCircleWithMainFixedUsecase())->invoke(12);

        // THEN
        // デモサークルのみしかデータベースにないときはサークルを一件も取得できない
        $this->assertEquals(0, count($actual->list));
    }

    /**
     * Cacheのkeyのテスト.
     *
     * @dataProvider dataProviderCacheTime
     */
    public function testGetCacheKey(string $time, string $expected)
    {
        Log::info('GetRandomCircleWithMainFixedUsecaseTest testRequest');

        // GIVEN
        Carbon::setTestNow(new Carbon($time));

        // WHEN
        $actual = GetRandomCircleWithMainFixedUsecase::getCacheKey();

        // THEN
        $this->assertEquals($expected, $actual);
    }

    /**
     * @return array
     */
    public function dataProviderCacheTime(): array
    {
        $data = [];

        for ($i = 0; $i < 60; $i++) {
            if ($i < 10) {
                $data[] = [
                    'time'     => "2017-01-02 09:0$i:59",
                    'expected' => 'GetRandomCircleWithMainFixedUsecase.2017010209.0',
                ];
            } elseif ($i < 20) {
                $data[] = [
                    'time'     => "2017-01-02 09:$i:59",
                    'expected' => 'GetRandomCircleWithMainFixedUsecase.2017010209.1',
                ];
            } elseif ($i < 30) {
                $data[] = [
                    'time'     => "2017-01-02 09:$i:59",
                    'expected' => 'GetRandomCircleWithMainFixedUsecase.2017010209.2',
                ];
            } elseif ($i < 40) {
                $data[] = [
                    'time'     => "2017-01-02 09:$i:59",
                    'expected' => 'GetRandomCircleWithMainFixedUsecase.2017010209.3',
                ];
            } elseif ($i < 50) {
                $data[] = [
                    'time'     => "2017-01-02 09:$i:59",
                    'expected' => 'GetRandomCircleWithMainFixedUsecase.2017010209.4',
                ];
            } elseif ($i < 60) {
                $data[] = [
                    'time'     => "2017-01-02 09:$i:59",
                    'expected' => 'GetRandomCircleWithMainFixedUsecase.2017010209.5',
                ];
            }
        }

        return $data;
    }
}
