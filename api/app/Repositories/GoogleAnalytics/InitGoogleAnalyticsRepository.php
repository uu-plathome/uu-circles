<?php

namespace App\Repositories\GoogleAnalytics;

use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\Gapic\BetaAnalyticsDataGapicClient;
use Illuminate\Support\Facades\Log;

class InitGoogleAnalyticsRepository
{
    /**
     * Google Analytics の Client
     *
     * @return BetaAnalyticsDataGapicClient
     * @throws \Google\ApiCore\ValidationException
     */
    public function init(): BetaAnalyticsDataGapicClient
    {
        Log::debug("InitGoogleAnalyticsRepository args none");

        // Using a default constructor instructs the client to use the credentials
        // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
        return new BetaAnalyticsDataClient([
            'credentials' => base_path('credentials.json'),
        ]);
    }
}
