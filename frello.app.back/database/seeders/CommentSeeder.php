<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
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
            Comment::factory(\mt_rand(config('seeders.comments.min'), config('seeders.comments.max')))->create([
                'card_id' => $card->id,
                'user_id' => $card->users->random(1)->first()->id
            ]);
        });
    }
}
