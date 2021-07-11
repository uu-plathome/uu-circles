<?php

declare(strict_types=1);

namespace App\Usecases\Main\Announcement\Dto;

use App\Enum\RouteProperty\WebRouteProperty;
use App\Models\Announcement;

/**
 * メイン画面用のお知らせ.
 *
 * Class MainAnnouncementDto
 */
final class MainAnnouncementDto
{
    public int $announcement_id;
    public string $title;
    public ?string $description;
    public ?string $link;
    public string $announcement_type;
    public string $importance;

    public static function byEloquent(Announcement $announcement): self
    {
        $dto = new self();
        $dto->announcement_id = $announcement->id;
        $dto->title = $announcement->title;
        $dto->description = $announcement->description;
        $dto->link = $announcement->link
            ? route(WebRouteProperty::WebShareAnnouncementShow, $announcement->slug)
            : null;
        $dto->announcement_type = $announcement->announcement_type;
        $dto->importance = $announcement->importance;

        return $dto;
    }

    public function toArray(): array
    {
        return [
            'announcement_id'   => $this->announcement_id,
            'title'             => $this->title,
            'description'       => $this->description,
            'link'              => $this->link,
            'announcement_type' => $this->announcement_type,
            'importance'        => $this->importance,
        ];
    }
}
