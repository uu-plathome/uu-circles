<?php

namespace App\Usecases\Main\Circle;

use App\Enum\PlaceOfActivity;
use App\Enum\Property\CircleInformationProperty;
use App\Models\Circle;
use App\Usecases\Main\Circle\Params\SearchTagCircleListParam;
use App\ValueObjects\CircleValueObject;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;

class SearchTagCircleListUsecase
{
    public function invoke(SearchTagCircleListParam $param)
    {
        Log::debug("#SearchTagCircleListUsecase args", [
            'param' => $param
        ]);

        $with = [
            'circleHandbill:circle_id,image_url',
        ];
        if ($this->shouldCircleTagSearch($param)) {
            $with[] = 'circleTag';
        }

        $circles = Circle::with($with)
            ->whereRelease(true)
            // 新歓が登録されているのものを取得
            ->hasByNonDependentSubquery('circleHandbill')
            ->hasByNonDependentSubquery('circleInformation', function (HasOne $query) use ($param) {
                /** @var \App\Models\CircleInformation $query */
                $query->when($param->mine, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereIn(
                            CircleInformationProperty::common_place_of_activity,
                            [
                                PlaceOfActivity::MINE,
                                PlaceOfActivity::MINE_AND_YOTO,
                            ]
                        );
                    });
                })->when($param->yoto, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereIn(
                            CircleInformationProperty::common_place_of_activity,
                            [
                                PlaceOfActivity::YOTO,
                                PlaceOfActivity::MINE_AND_YOTO,
                            ]
                        );
                    });
                })->when($param->mammoth, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereMammoth();
                    });
                })->when($param->active_activity, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereActiveActivity();
                    });
                })->when($param->monday, function ($query) {
                    $query->orWhere(function ($query) {
                        $query->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereCommonDateOfActivityMonday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivityMonday(true);
                        });
                    });
                })->when($param->tuesday, function ($query) {
                    $query->orWhere(function ($query) {
                        $query->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereCommonDateOfActivityTuesday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivityTuesday(true);
                        });
                    });
                })->when($param->wednesday, function ($query) {
                    $query->orWhere(function ($query) {
                        $query->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereCommonDateOfActivityWednesday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivityWednesday(true);
                        });
                    });
                })->when($param->thursday, function ($query) {
                    $query->orWhere(function ($query) {
                        $query->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereCommonDateOfActivityThursday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivityThursday(true);
                        });
                    });
                })->when($param->friday, function ($query) {
                    $query->orWhere(function ($query) {
                        $query->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereCommonDateOfActivityFriday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivityFriday(true);
                        });
                    });
                })->when($param->holiday, function ($query) {
                    $query->orWhere(function ($query) {
                        $query->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereCommonDateOfActivitySaturday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivitySaturday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivitySunday(true);
                        })->orWhere(function ($query) {
                            /** @var \App\Models\CircleInformation $query */
                            $query->whereOnlineDateOfActivitySunday(true);
                        });
                    });
                })->when($param->only_monday, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereOnlyMonday();
                    });
                })->when($param->only_tuesday, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereOnlyTuesday();
                    });
                })->when($param->only_wednesday, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereOnlyWednesday();
                    });
                })->when($param->only_thursday, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereOnlyThursday();
                    });
                })->when($param->only_friday, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereOnlyFriday();
                    });
                })->when($param->online, function ($query) {
                    $query->orWhere(function ($query) {
                        /** @var \App\Models\CircleInformation $query */
                        $query->whereIsOnlineActivity(true);
                    });
                });
            })
            ->when($this->shouldCircleTagSearch($param), function ($query) use ($param) {
                $query->hasByNonDependentSubquery('circleTag', function ($query) use ($param) {
                    $query->when($param->sport, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('sport', true);
                    })->when($param->music, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('music', true);
                    })->when($param->culture, function ($query) {
                        /** @var \App\Models\CircleTag $query */
                        $query->orWhere('culture', true);
                    })->when($param->nature, function ($query) {
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
                'circles.' . 'name',
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
