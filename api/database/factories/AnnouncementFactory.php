<?

namespace Database\Factories;

use App\Enum\AnnouncementType;
use App\Enum\Importance;
use App\Enum\Property\AnnouncementProperty;
use App\Models\Announcement;
use App\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnnouncementFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Announcement::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            AnnouncementProperty::title                => 'アンケートにご回答お願いします。',
            AnnouncementProperty::announcement_type    => AnnouncementType::QUESTIONNAIRE,
            AnnouncementProperty::link                 => 'https://uu-circles.com',
            AnnouncementProperty::importance           => Importance::HIGH,
            AnnouncementProperty::slug                 => (string) Str::uuid(),
            AnnouncementProperty::for_admin_mail       => false,
            AnnouncementProperty::for_admin_view       => false,
            AnnouncementProperty::for_circle_mail      => false,
            AnnouncementProperty::for_main_view        => false,
            AnnouncementProperty::for_newjoy_discord   => false,
            AnnouncementProperty::is_main_view_fixed   => true,
            AnnouncementProperty::is_circle_view_fixed => false,
            AnnouncementProperty::is_admin_view_fixed  => false,
            AnnouncementProperty::active               => true,
        ];
    }

    /**
     * 管理者画面でのみ、固定するお知らせ
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function isAdminViewFixed(): Factory
    {
        return $this->state(fn (array $attributes) => [
            AnnouncementProperty::title               => 'サークルが追加できない現象に関して',
            AnnouncementProperty::announcement_type   => AnnouncementType::BUG,
            AnnouncementProperty::is_admin_view_fixed => true,
        ]);
    }
}
