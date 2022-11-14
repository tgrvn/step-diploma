<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\Column;
use Illuminate\Database\Seeder;

class CardsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lists = Column::all();

        $lists->each(function ($list) {
            $cardCount = \mt_rand(config('seeders.cards.min '), config('seeders.cards.max'));

            for ($i = 0; $i < $cardCount; $i++) {
                Card::factory()->create([
                    'column_id' => $list->id,
                    'index' => $i
                ]);
            }
        });
    }
}
