<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Column;
use Illuminate\Database\Seeder;

class ColumnsSeeder extends Seeder
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
            $listsCount = \mt_rand(config('seeders.columns.min'), config('seeders.columns.max'));

            for ($i = 0; $i < $listsCount; $i++) {
                Column::factory()->create([
                    'board_id' => $board->id,
                    'index' => $i
                ]);
            }
        });
    }
}
