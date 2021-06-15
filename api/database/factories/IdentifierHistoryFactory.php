<?php

namespace Database\Factories;

use App\Enum\Property\IdentifierHistoryProperty;
use App\Models\IdentifierHistory;
use Illuminate\Database\Eloquent\Factories\Factory;

class IdentifierHistoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = IdentifierHistory::class;

    /**
     * Define the model's default state.
     *
     * @throws \Exception
     *
     * @return array
     */
    public function definition()
    {
        return [
            IdentifierHistoryProperty::ip_address => $this->faker->ipv4,
            IdentifierHistoryProperty::user_agent => $this->faker->userAgent,
            IdentifierHistoryProperty::count      => random_int(1, 100),
        ];
    }
}
