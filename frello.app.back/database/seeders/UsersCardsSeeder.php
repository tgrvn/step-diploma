<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\UserCard;
use Illuminate\Database\Seeder;

class UsersCardsSeeder extends Seeder
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
            $maxMembers = $card->column->board->users->count();
            $userId = $card->column->board->users->random()->id;
            $members = \mt_rand(1, $maxMembers);

            UserCard::factory($members)->create([
                'card_id' => $card->id,
                'user_id' => $userId
            ]);
        });
    }
}
