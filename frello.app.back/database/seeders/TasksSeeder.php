<?php

namespace Database\Seeders;

use App\Models\Checklist;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $checklists = Checklist::all();

        $checklists->each(function ($checklist) {
            $tasksCount = \mt_rand(config('seeders.tasks.min'), config('seeders.tasks.max'));

            for ($i = 0; $i < $tasksCount; $i++) {
                Task::factory()->create([
                    'checklists_id' => $checklist->id,
                    'is_done' => \mt_rand(0, 1) ? true : false
                ]);
            }
        });
    }
}
