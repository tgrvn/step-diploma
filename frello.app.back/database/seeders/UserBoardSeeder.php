<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\User;
use App\Models\UserBoard;
use Illuminate\Database\Seeder;

class UserBoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $boards = Board::all();

        $boards->each(function ($board) {
            UserBoard::factory(config('seeders.premissions'))->create([
                'board_id' => $board->id,
            ]);
        });
    }
}
