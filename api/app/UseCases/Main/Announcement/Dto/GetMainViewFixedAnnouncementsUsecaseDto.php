<?php

declare(strict_types=1);

namespace App\Usecases\Main\Announcement\Dto;

use Illuminate\Support\Collection;

final class GetMainViewFixedAnnouncementsUsecaseDto
{
    /**
     * @var MainAnnouncementDto[]
     */
    public array $announcements;

    public function toArray(): array
    {
        return [
            'announcements'                   => (new Collection($this->announcements))->map(
                fn (MainAnnouncementDto $dto) => $dto->toArray()
            )->toArray(),
        ];
    }
}
