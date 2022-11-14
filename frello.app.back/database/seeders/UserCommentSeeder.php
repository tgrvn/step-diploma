<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\Column;
use App\Models\Comment;
use App\Models\UserComment;
use Illuminate\Database\Seeder;

class UserCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comments = Comment::all();

        $comments->each(function ($comment) {
            $userId = $comment->card->column->board->users->random()->id;

            UserComment::factory()->create([
                'comment_id' => $comment->id,
                'user_id' => $userId
            ]);
        });
    }
}
