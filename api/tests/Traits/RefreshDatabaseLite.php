<?php

declare(strict_types=1);

namespace Tests\Traits;

use App\Console\Kernel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabaseState;

trait RefreshDatabaseLite
{
    use RefreshDatabase;

    /**
     * Refresh a conventional test database.
     *
     * @return void
     */
    protected function refreshTestDatabase()
    {
        if (!RefreshDatabaseState::$migrated) {
            $this->artisan('migrate');

            $this->app[Kernel::class]->setArtisan(null);

            RefreshDatabaseState::$migrated = true;
        }

        $this->beginDatabaseTransaction();
    }
}
