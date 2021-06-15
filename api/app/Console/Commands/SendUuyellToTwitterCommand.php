<?php

namespace App\Console\Commands;

use App\Usecases\Batch\UuYell\SendUuyellPostToTwitterUsecase;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SendUuyellToTwitterCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'twitter:send-uuyell';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    private SendUuyellPostToTwitterUsecase $sendUuyellPostToTwitterUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(SendUuyellPostToTwitterUsecase $sendUuyellPostToTwitterUsecase)
    {
        parent::__construct();

        $this->sendUuyellPostToTwitterUsecase = $sendUuyellPostToTwitterUsecase;
    }

    /**
     * Execute the console command.
     *
     * @throws \Exception
     *
     * @return int
     */
    public function handle()
    {
        Log::debug('SendUuyellToTwitterCommand handle args none');

        $this->sendUuyellPostToTwitterUsecase->invoke();

        return 0;
    }
}
