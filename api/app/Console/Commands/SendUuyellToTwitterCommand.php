<?php

namespace App\Console\Commands;

use App\Repositories\Twitter\InitTwitterRepository;
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

    private InitTwitterRepository $repository;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(InitTwitterRepository $repository)
    {
        parent::__construct();

        $this->repository = $repository;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::debug("SendUuyellToTwitterCommand handle args none");

        $auth = $this->repository->init();
        $this->repository->tweet($auth);

        return 0;
    }
}
