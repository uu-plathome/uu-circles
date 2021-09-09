<?php

declare(strict_types=1);


namespace Tests\Feature\Usecases\Main\Circle;

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
     * Cacheのkeyのテスト
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
                    "time"     => "2017-01-02 09:0$i:59",
                    "expected" => "GetRandomCircleWithMainFixedUsecase.2017010209.0"
                ];
            } else if ($i < 20) {
                $data[] = [
                    "time"     => "2017-01-02 09:$i:59",
                    "expected" => "GetRandomCircleWithMainFixedUsecase.2017010209.1"
                ];
            } else if ($i < 30) {
                $data[] = [
                    "time"     => "2017-01-02 09:$i:59",
                    "expected" => "GetRandomCircleWithMainFixedUsecase.2017010209.2"
                ];
            } else if ($i < 40) {
                $data[] = [
                    "time"     => "2017-01-02 09:$i:59",
                    "expected" => "GetRandomCircleWithMainFixedUsecase.2017010209.3"
                ];
            } else if ($i < 50) {
                $data[] = [
                    "time"     => "2017-01-02 09:$i:59",
                    "expected" => "GetRandomCircleWithMainFixedUsecase.2017010209.4"
                ];
            } else if ($i < 60) {
                $data[] = [
                    "time"     => "2017-01-02 09:$i:59",
                    "expected" => "GetRandomCircleWithMainFixedUsecase.2017010209.5"
                ];
            }
        }

        return $data;
    }
}
