<?php

namespace App\Usecases\Main\Circle;

use App\Models\Circle;
use App\Usecases\Main\Circle\Params\SearchTagCircleListParam;
use App\ValueObjects\CircleValueObject;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SearchTagCircleListUsecase
{
    public function invoke(SearchTagCircleListParam $param)
    {
        $circles = Circle::with([
            'circleInformation:circle_id,name',
            'circleHandbill:circle_id,image_url',
            'circleTag',
        ])->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->hasByNonDependentSubquery('circleInformation', function (HasOne $query) use ($param) {
                /** @var \App\Models\CircleInformation $query */
                $query->when($param->mammoth, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereMammoth();
                    });
                })->when($param->active, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereActiveActivity();
                    });
                });
            })
            ->when($this->shouldCircleTagSearch($param), function ($query) use ($param) {
                $query->hasByNonDependentSubquery('circleTag', function ($query) use ($param) {
                    $query->when($param->nature, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('nature', true);
                    })->when($param->community, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('community', true);
                    })->when($param->international, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('international', true);
                    })->when($param->incare, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('incare', true);
                    })->when($param->programming, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('programming', true);
                    })->when($param->volunteer, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('volunteer', true);
                    })->when($param->loose, function ($query) {
                        /** @var \App\loose\CircleTag $query */
                        $query->orWhere('loose', true);
                    })->when($param->urgent_recruitment, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('urgent_recruitment', true);
                    })->when($param->mystery, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('mystery', true);
                    });
                });
            })
            ->select([
                'circles.' . 'id',
                'circles.' . 'release',
                'circles.' . 'slug'
            ])
            ->join('circle_information', 'circle_information.circle_id', '=', 'circles.id')
            ->orderByDesc('circle_information.updated_at')
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        )->toArray();
    }

    private function shouldCircleTagSearch(SearchTagCircleListParam $param): bool
    {
        if ($param->sport) {
            return true;
        }
        if ($param->music) {
            return true;
        }
        if ($param->culture) {
            return true;
        }
        if ($param->nature) {
            return true;
        }
        if ($param->community) {
            return true;
        }
        if ($param->international) {
            return true;
        }
        if ($param->incare) {
            return true;
        }
        if ($param->programming) {
            return true;
        }
        if ($param->volunteer) {
            return true;
        }
        if ($param->loose) {
            return true;
        }
        if ($param->mammoth) {
            return true;
        }
        if ($param->urgent_recruitment) {
            return true;
        }
        if ($param->mystery) {
            return true;
        }

        return false;
    }
}
