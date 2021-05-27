<?php

namespace Database\Seeders;

use App\Enum\Property\PageViewProperty;
use App\Models\Circle;
use App\Models\PageView;
use App\Support\Arr;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class PageViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        $now = Carbon::now();

        /** @var Circle $circle */
        $circle = Circle::inRandomOrder()->first();
        $insertData = [
            [
                PageViewProperty::url          => '/',
                PageViewProperty::active_users => random_int(100, 1000),
                PageViewProperty::page_views   => random_int(1000, 10000),
            ],
            [
                PageViewProperty::url          => '/circle',
                PageViewProperty::active_users => random_int(100, 1000),
                PageViewProperty::page_views   => random_int(1000, 10000),
            ],
            [
                PageViewProperty::url          => "/circle/$circle->slug",
                PageViewProperty::active_users => random_int(100, 1000),
                PageViewProperty::page_views   => random_int(1000, 10000),
            ],
        ];

        PageView::insert(
            (new Collection($insertData))->map(fn (array $arr) => [
                PageViewProperty::url          => Arr::get($arr, PageViewProperty::url),
                PageViewProperty::active_users => Arr::get($arr, PageViewProperty::active_users),
                PageViewProperty::page_views   => Arr::get($arr, PageViewProperty::page_views),
                PageViewProperty::created_at   => $now,
                PageViewProperty::updated_at   => $now,
            ])->toArray()
        );
    }
}
