<?php

namespace Database\Factories;

use App\Enum\Property\IdentifierProperty;
use App\Models\Identifier;
use Illuminate\Database\Eloquent\Factories\Factory;

class IdentifierFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Identifier::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            IdentifierProperty::identifier_hash => Identifier::generateIdentifierHash(),
        ];
    }
}
