<?php

namespace Tests\Feature\App\Http\Controllers\Admin\Advertise;

use App\Enum\Property\AdvertiseProperty;
use App\Models\Advertise;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class ShowAdvertiseControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("ShowAdvertiseControllerTest");
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
        Advertise::query()->delete();
        $this->assertCount(0, Advertise::all());

        $advertises = factory(Advertise::class, 1)->create();
        $this->assertTrue($advertises instanceof Collection);
        /** @var Advertise $advertise */
        $advertise = $advertises[0];
        $advertise = Advertise::find($advertise->id);
        Log::info('[GIVEN]', [
            'advertises' => $advertises,
            'id'         => $advertise->id,
        ]);


        // WHEN
        $response = $this->get("/admin/api/advertise/$advertise->id", [
            'Authorization' => 'Bearer test1234',
        ]);

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);

        $data = $response['data'];
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::title), $data);
        $this->assertSame(
            $advertise->title,
            $data[Str::camel(AdvertiseProperty::title)]
        );
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::link), $data);
        $this->assertSame(
            $advertise->link,
            $data[Str::camel(AdvertiseProperty::link)]
        );
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::active), $data);
        $this->assertSame(
            $advertise->active,
            $data[Str::camel(AdvertiseProperty::active)]
        );
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::advertise_type), $data);
        $this->assertSame(
            $advertise->advertise_type,
            $data[Str::camel(AdvertiseProperty::advertise_type)]
        );
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::main_image_url), $data);
        $this->assertSame(
            $advertise->main_image_url,
            $data[Str::camel(AdvertiseProperty::main_image_url)]
        );
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::publish_to), $data);
        $this->assertSame(
            $advertise->publish_to,
            $data[Str::camel(AdvertiseProperty::publish_to)]
        );
        $this->assertArrayHasKey(Str::camel(AdvertiseProperty::publish_from), $data);
        $this->assertSame(
            $advertise->publish_from,
            $data[Str::camel(AdvertiseProperty::publish_from)]
        );
    }
}
