<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameValidatingRequest;
use App\Http\Resources\ShowColumnResource;
use App\Models\Board;
use App\Models\Card;
use App\Models\Column;
use App\Models\UserBoard;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function create(NameValidatingRequest $request, $id)
    {
        $validated = $request->validated();

        $lastIndex = Board::find($id)->columns->max('index');

        $column = Column::create(['name' => $validated['name'], 'board_id' => $id, 'index' => $lastIndex + 1]);

        $response = [
            "data" =>  new ShowColumnResource($column),
        ];

        return $response;
    }

    public function update(NameValidatingRequest $request, $id, $columnId)
    {
        $column = Board::find($id)->columns->find($columnId);

        $validated = $request->validated();

        $column->update($validated);

        $response = [
            'message' => "column updated",
        ];

        return $response;
    }

    public function drop($id, $columnId)
    {
        $column = Column::find($columnId);

        if (!$column) {
            return response()->json()->error(401, "Failed", ["errors" => "not found"]);
        }

        $column->delete();

        $columns = Board::find($id)->columns;

        if ($columns->isNotEmpty()) {
            $columns->each(function ($column, $key) {
                $column->update(['index' => $key]);
            });
        }

        $response = [
            'message' => 'column was deleted'
        ];

        return response()->json()->success(201, "OK", $response);
    }

    public function updateIndexes($id, Request $request)
    {
        $data = $request->all();

        $requestCards = array_reduce($data["data"], function ($acc, $item) {
            return [...$acc, ...$item["cards"]];
        }, []);

        array_walk($requestCards, function ($card) {
            $dbCard = Card::find($card["id"]);

            if ($card["index"] != $dbCard->index || $card["column_id"] != $dbCard->column_id) {
                $dbCard->update(["index" => $card["index"], "column_id" => $card["column_id"]]);
            }
        });

        array_walk($data["data"], function ($column) {
            $dbColumn = Column::find($column["id"]);

            if ($column["index"] != $dbColumn->index) {
                $dbColumn->update(["index" => $column["index"]]);
            }
        });

        return response($data, 201);
    }
}
