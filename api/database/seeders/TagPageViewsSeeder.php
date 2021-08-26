<?php

namespace Database\Seeders;

use App\Enum\Property\TagPageViewProperty;
use App\Enum\SlugProperty\TagSlugProperty;
use App\Models\TagPageView;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class TagPageViewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws \Exception
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        $insertData = $this->insertData($now);
        TagPageView::insert($insertData);
    }

    /**
     * @throws \Exception
     */
    private function insertData(Carbon $now): array
    {
        return (new Collection(TagSlugProperty::getAll()))->map(
            fn (string $tag) => [
                TagPageViewProperty::tag_name     => $tag,
                TagPageViewProperty::page_views   => random_int(1e2, 1e8),
                TagPageViewProperty::active_users => random_int(0, 1e3),
                TagPageViewProperty::created_at   => $now,
                TagPageViewProperty::updated_at   => $now,
            ]
        )->toArray();
    }
}
