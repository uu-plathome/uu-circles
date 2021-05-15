<?php

namespace App\Console\Commands\Operation\TwentyOneMay;

use App\Enum\AnnouncementType;
use App\Enum\Importance;
use App\Usecases\Admin\Announcement\CreateAnnouncementUsecase;
use App\Usecases\Admin\Announcement\Params\CreateAnnouncementUsecaseParam;
use Illuminate\Console\Command;

class AddDemoAnnouncement extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'operation-202105:add-demo-announcement';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '１日ごとの広告のクリック数の集計';

    private CreateAnnouncementUsecase $createAnnouncementUsecase;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(
        CreateAnnouncementUsecase $createAnnouncementUsecase
    ) {
        parent::__construct();
        $this->createAnnouncementUsecase = $createAnnouncementUsecase;
    }

    /**
     * Execute the console command.
     *
     * @return int
     * @throws \Exception
     */
    public function handle()
    {
        $param = new CreateAnnouncementUsecaseParam();
        $param->title = 'UU-Circlesのアンケート回答お願いします。';
        $param->description = '';
        $param->importance = Importance::HIGH;
        $param->link = 'https://forms.gle/9nyqVtdLMe5MipPp7';
        $param->announcement_type = AnnouncementType::QUESTIONNAIRE;
        $param->for_main_view = true;
        $param->for_circle_mail = false;
        $param->for_admin_view = false;
        $param->for_admin_mail = false;
        $param->for_newjoy_discord = false;
        $param->active = true;
        $param->is_main_view_fixed = true;
        $param->is_circle_view_fixed = false;
        $param->is_admin_view_fixed = false;
        $param->notification_time = null;
        $param->publish_to = null;
        $param->publish_from = null;

        $this->createAnnouncementUsecase->invoke($param);
    }
}
