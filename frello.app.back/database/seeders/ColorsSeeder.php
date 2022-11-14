<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $colors = config('colors');

        foreach ($colors as $color) {
            Color::create([
                'hex' => '#' . $color,
                'type' => 'color'
            ]);
        }
    }
}
