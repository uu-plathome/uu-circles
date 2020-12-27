<?php

namespace App\Usecases\Admin;

use App\Models\Circle;

class IndexCircleUsecase
{
    /**
     * invoke
     *
     * @return array
     */
    public function invoke(): array
    {
        return Circle::get()->all();
    }
}
