<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckDbCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:db';

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
        $this->info('default=' . config('database.default'));
        $this->info('host=' . config('database.connections.mysql.host'));
        $this->info('port=' . config('database.connections.mysql.port'));
        $this->info('database=' . config('database.connections.mysql.database'));
        $this->info('username=' . config('database.connections.mysql.username'));
        $this->info('password=' . config('database.connections.mysql.password'));
    }
}
