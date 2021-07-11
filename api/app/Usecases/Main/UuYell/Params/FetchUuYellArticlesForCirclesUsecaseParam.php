<?php

declare(strict_types=1);

namespace App\Usecases\Main\UuYell\Params;

final class FetchUuYellArticlesForCirclesUsecaseParam
{
    public ?string $name;

    public ?string $circle_url;
}
