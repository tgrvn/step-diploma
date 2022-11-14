<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameValidatingRequest;
use App\Http\Resources\ChecklistResource;
use App\Models\Checklist;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{

    public function create(NameValidatingRequest $request, $id, $cardId)
    {
        $validated = $request->validated();

        $checklist = Checklist::create([
            'card_id' => $cardId,
            'name' => $validated["name"]
        ]);

        $response = [
            "data" => new ChecklistResource($checklist),
            "message" => "checklist was created"
        ];

        return $response;
    }

    public function update(NameValidatingRequest $request, $id, $cardId, $checkId)
    {
        $validated = $request->validated();
        $check = Checklist::find($checkId);

        $check->update([
            'name' => $validated["name"]
        ]);

        $response = [
            "message" => "checklist was updated"
        ];

        return $response;
    }

    public function drop($id, $cardId, $checkId)
    {
        $check = Checklist::find($checkId);
        $check->delete();

        $response = [
            "message" => "checklist was deleted"
        ];

        return response()->json()->success(201, "OK", $response);
    }
}
