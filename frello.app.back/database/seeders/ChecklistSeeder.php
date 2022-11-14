<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\Checklist;
use Illuminate\Database\Seeder;

class ChecklistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cards = Card::all();

        $cards->each(function ($card) {
            Checklist::factory(\mt_rand(config('seeders.checklists.min'), config('seeders.checklists.max')))->create([
                'card_id' => $card->id
            ]);
        });
    }
}
