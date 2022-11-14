<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameValidatingRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class TaskController extends Controller
{
    public function create(NameValidatingRequest $request, $id, $cardId, $checkId)
    {
        $validated = $request->validated();

        $task = Task::create([
            'name' => $validated["name"],
            'checklists_id' => $checkId,
            'is_done' => false
        ]);

        $response = [
            "data" => new TaskResource($task),
            "message" => "task was created"
        ];

        return $response;
    }

    public function update(NameValidatingRequest $request, $id, $cardId, $checkId, $taskId)
    {
        $validated = $request->validated();
        $task = Task::find($taskId);

        $task->update([
            'name' => $validated["name"],
        ]);

        $response = [
            "message" => "task was updated"
        ];

        return $response;
    }

    public function drop($id, $cardId, $checkId, $taskId)
    {
        $task = Task::find($taskId);

        if (!$task) {
            return response()->json()->error(401, "failure", ["message" => "task not found"]);
        }

        $task->delete();

        return response()->json()->success(201, "OK", ["message" => "task was deleted"]);
    }

    public function stateTask($id, $cardId, $checkId, $taskId)
    {
        $task = Task::find($taskId);

        if (!$task->is_done) {
            $task->update([
                'is_done' => true
            ]);
        } else {
            $task->update([
                'is_done' => false
            ]);
        }

        return response()->json()->success(201, "OK", ["message" => "state updated", "data" => $task]);
    }
}
