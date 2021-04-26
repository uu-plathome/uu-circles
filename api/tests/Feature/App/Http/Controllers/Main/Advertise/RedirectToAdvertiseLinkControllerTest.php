<?php

namespace Tests\Feature\App\Http\Controllers\Main\Advertise;

use App\Enum\Property\AdvertiseCounterProperty;
use App\Models\Advertise;
use App\Models\AdvertiseCounter;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Tests\Traits\RefreshDatabaseLite;

class RedirectToAdvertiseLinkControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("RedirectToAdvertiseLinkControllerTest");
        Cache::clear();
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

        // GIVEN
        $advertise = Advertise::nowPublic(Carbon::now())->inRandomOrder()->first();
        $this->assertNotNull($advertise);
        $oldAdvertiseCountersCount = AdvertiseCounter::whereAdvertiseId($advertise->id)
            ->whereLink($advertise->link)
            ->get()
            ->sum(AdvertiseCounterProperty::count);
        Log::info("広告のクリック数", [
            'oldAdvertiseCountersCount' => $oldAdvertiseCountersCount,
        ]);

        // WHEN
        $response = $this->get("/share/advertise/{$advertise->slug}");

        // THEN
        $response->assertRedirect($advertise->link);

        // 広告のクリック数が増加しているかを確認
        $newAdvertiseCountersCount = AdvertiseCounter::whereAdvertiseId($advertise->id)
            ->whereLink($advertise->link)
            ->get()
            ->sum(AdvertiseCounterProperty::count);
        Log::info("広告のクリック数", [
            'oldAdvertiseCountersCount' => $oldAdvertiseCountersCount,
            'newAdvertiseCountersCount' => $newAdvertiseCountersCount,
        ]);
        $this->assertSame($oldAdvertiseCountersCount + 1, $newAdvertiseCountersCount);
    }
}
