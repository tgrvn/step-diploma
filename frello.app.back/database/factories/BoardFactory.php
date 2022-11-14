<?php

namespace Database\Factories;

use App\Models\Background;
use App\Models\Board;
use App\Models\Color;
use Illuminate\Database\Eloquent\Factories\Factory;

class BoardFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Board::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $backgrounds = Background::all();
        $colors = Color::all();
        $random = mt_rand(0, 1);
        $themeType = $random ? 'Color' : 'Background';
        $themeId = $random ? $colors->random()->id : $backgrounds->random()->id;

        return [
            'name' => $this->faker->words(\rand(1, 4), true),
            'theme_type' => "App\\Models\\" . $themeType,
            'theme_id' => $themeId
        ];
    }
}
