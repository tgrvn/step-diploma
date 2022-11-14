<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BackgroundsSeeder::class);
        $this->call(ColorsSeeder::class);
        Board::factory(config('seeders.boards'))->create();
        $this->call(UserBoardSeeder::class);
        $this->call(ColumnsSeeder::class);
        $this->call(CardsSeeder::class);
        $this->call(UsersCardsSeeder::class);
        $this->call(ChecklistSeeder::class);
        $this->call(TasksSeeder::class);
        $this->call(CommentSeeder::class);
        // $this->call(UserCommentSeeder::class);
    }
}
