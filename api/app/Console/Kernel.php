<?php

namespace App\Console;

use App\Console\Commands\SynchronizeGoogleAnalyticsToAppCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\CopyUuYellPostsCommand::class,
        Commands\AggregateAdvertiseCounterPerDayCommand::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     *
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('copy:uu-yell')
            ->everyFourHours();

        $schedule->command('aggregate:advertise-counter')
            ->daily();

        $schedule->command('aggregate:announcement-counter')
            ->dailyAt('1:00');

        // Google AnalyticsのデータをDBにコピーする
        $schedule->command(SynchronizeGoogleAnalyticsToAppCommand::SIGNATURE)
            ->dailyAt('4:30');

        //
        //        $schedule->command('twitter:send-uuyell')
        //            ->dailyAt('19:30');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
