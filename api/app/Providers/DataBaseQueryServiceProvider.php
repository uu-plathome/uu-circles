<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Database\Events\TransactionCommitted;
use Illuminate\Database\Events\TransactionRolledBack;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class DataBaseQueryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        if (config('logging.sql.enable') === false) {
            return;
        }

        DB::listen(function ($query): void {
            $sql = $query->sql;

            foreach ($query->bindings as $binding) {
                if (is_string($binding)) {
                    $binding = "'{$binding}'";
                } elseif (is_bool($binding)) {
                    $binding = $binding ? '1' : '0';
                } elseif (is_int($binding)) {
                    $binding = (string) $binding;
                } elseif ($binding === null) {
                    $binding = 'NULL';
                } elseif ($binding instanceof Carbon) {
                    $binding = "'{$binding->toDateTimeString()}'";
                } elseif ($binding instanceof DateTime) {
                    $binding = "'{$binding->format('Y-m-d H:i:s')}'";
                }

                $sql = preg_replace('/\\?/', $binding, $sql, 1);
            }

            Log::debug('SQL', ['sql' => $sql, 'time' => "{$query->time} ms"]);
        });

        Event::listen(TransactionBeginning::class, function (TransactionBeginning $event): void {
            Log::debug('START TRANSACTION');
        });

        Event::listen(TransactionCommitted::class, function (TransactionCommitted $event): void {
            Log::debug('COMMIT');
        });

        Event::listen(TransactionRolledBack::class, function (TransactionRolledBack $event): void {
            Log::debug('ROLLBACK');
        });
    }
}
