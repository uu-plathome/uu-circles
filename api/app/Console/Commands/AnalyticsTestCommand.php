<?php

namespace App\Console\Commands;

use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Illuminate\Console\Command;

class AnalyticsTestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:analytics';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Google Analyticsのデータを取得する';

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
        /**
         * TODO(developer): Replace this variable with your Google Analytics 4
         *   property ID before running the sample.
         */
        $property_id = '262827824';

        // Using a default constructor instructs the client to use the credentials
        // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
        $client = new BetaAnalyticsDataClient([
            'credentials' => base_path('credentials.json'),
        ]);

        // Make an API call.
        $response = $client->runReport([
            'property' => 'properties/' . $property_id,
            'dateRanges' => [
                new DateRange([
                    'start_date' => '2020-03-31',
                    'end_date' => 'today',
                ]),
            ],
            'dimensions' => [new Dimension(
                [
                    'name' => 'pagePath',
                ]
            ),
            ],
            'metrics' => [new Metric(
                [
                    'name' => 'activeUsers',
                ]
            )
            ]
        ]);

        // Print results of an API call.
        print 'Report result: ' . PHP_EOL;

        foreach ($response->getRows() as $row) {
            print $row->getDimensionValues()[0]->getValue()
                . ' ' . $row->getMetricValues()[0]->getValue() . PHP_EOL;
        }
        return 0;
    }
}
