<?php

namespace App\Usecases\Admin;

use App\Models\Circle;

class IndexCircleUsecase
{
    /**
     * invoke
     *
     * @return void
     */
    public function invoke()
    {
        return Circle::get();
    }
}
