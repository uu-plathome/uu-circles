<?php

namespace App\Console\Commands;

use App\Enum\Property\CircleInformationProperty;
use App\Models\CircleInformation;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FormatTwitterUrl20210504 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'operation:format-twitter-url-20210504';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::debug('FormatTwitterUrl20210504 args none');

        CircleInformation::whereNotNull(CircleInformationProperty::twitter_url)
            ->chunk(
                100,
                function ($circleInformations) {
                    DB::beginTransaction();

                    try {
                        foreach ($circleInformations as $circleInformation) {
                            $circleInformation->fill([
                                CircleInformationProperty::twitter_url => CircleInformation::formatTwitterUrl($circleInformation->twitter_url),
                            ])->save();
                        }
                        DB::commit();
                    } catch (Exception $e) {
                        DB::rollBack();

                        throw $e;
                    }
                }
            );

        Log::debug('FormatTwitterUrl20210504 end');

        return 0;
    }
}
