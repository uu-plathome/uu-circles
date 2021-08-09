<?php

namespace App\Console;

use App\Console\Commands\SynchronizeGoogleAnalyticsToAppCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

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
        // uu-yellの記事をコピー
        $schedule->command('copy:uu-yell')
            ->everyFourHours();

        // 広告の集計
        $schedule->command('aggregate:advertise-counter')
            ->daily();

        // お知らせの集計
        $schedule->command('aggregate:announcement-counter')
            ->dailyAt('1:00');

        // Google AnalyticsのデータをDBにコピーする
        $schedule->command(SynchronizeGoogleAnalyticsToAppCommand::SIGNATURE)
            ->dailyAt('4:30');

        // Twitterへuu-yellの記事を投稿 (※ Twitter APIがないからできない)
        //        $schedule->command('twitter:send-uuyell')
        //            ->dailyAt('19:30');

        // Queueの実行
        $schedule->command('queue:restart')
            ->everyTenMinutes()
            ->before(function () {
                Log::debug('[Queue Restart] start');
            })
            ->after(function () {
                Log::debug('[Queue Restart] end');
            });
        $schedule->command('queue:work --tries=3')
            ->everyMinute()
            ->withoutOverlapping()
            ->before(function () {
                Log::debug('[Queue Work] start');
            })
            ->after(function () {
                Log::debug('[Queue Work] end');
            });
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
