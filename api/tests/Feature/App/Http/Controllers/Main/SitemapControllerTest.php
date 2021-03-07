<?php

namespace Tests\Feature\App\Http\Controllers\Main;

use App\Support\Arr;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class SitemapControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("SitemapControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info("testRequest");
        $url = config('app.client_url');

        // GIVEN
        $expected = [
            $url,
            $url . '/circle',
            $url . '/circle/newjoy',
            $url . '/guide/discord',
            $url . '/guide/management-team',
            $url . '/guide/to-new-students',
        ];

        // WHEN
        $response = $this->get('/api/sitemap');

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $data = $response['data'];

        Log::debug($data);

        foreach ($expected as $val) {
            $this->assertNotEmpty(Arr::first($data, function ($arr, $key) use ($val) {
                $bool = $arr['siteUrl'] === $val;

                if (!$bool) {
                    Log::info("$val don't exist.");
                }

                return $bool;
            }));
        }
    }
}
