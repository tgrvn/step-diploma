<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'checklists_id' => 0,
            'name' => $this->faker->words(\mt_rand(1, 4), true),
            'is_done' => false
        ];
    }
}
