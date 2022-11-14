<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameValidatingRequest;
use App\Http\Resources\CurrentCardResource;
use App\Http\Resources\ShowCardResource;
use App\Models\Board;
use App\Models\Card;
use App\Models\Column;
use App\Models\User;
use App\Models\UserBoard;
use App\Models\UserCard;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function create(NameValidatingRequest $request, $id, $columnId)
    {
        $column = Column::find($columnId);

        if (!$column) {
            $response = [
                "errors" => "column not found",
            ];

            return $response;
        }

        $cards = $column->cards;
        $lastIndex = 0;

        if ($cards) {
            $lastIndex = $cards->max("index") + 1;
        }

        $validate = $request->validated();

        $createdCard = Card::create([
            'name' => $validate["name"],
            'column_id' => $columnId,
            'index' => $lastIndex
        ]);

        $response = [
            'data' => $createdCard,
            "message" => "card created",
        ];

        return $response;
    }

    public function updateName(NameValidatingRequest $request, $id, $cardId)
    {
        $card = Card::find($cardId);

        $validated = $request->validated();

        $card->update($validated);

        $response = [
            "message" => "card name updated"
        ];

        return $response;
    }

    public function updateDescription(Request $request, $id, $cardId)
    {
        $card = Card::find($cardId);

        $validated = $request->all();

        $card->update([
            'description' => $validated["name"]
        ]);

        $response = [
            "message" => "card description updated"
        ];

        return $response;
    }

    public function drop($id, $cardId)
    {
        $card = Card::find($cardId);
        $column = $card->column;

        $card->delete();

        $cards = $column->cards;

        if ($cards->isNotEmpty()) {
            $cards->each(function ($card, $key) {
                $card->update(['index' => $key]);
            });
        }

        return response()->json()->success(201, "OK", ["message" => "card was deleted"]);
    }

    public function show($id, $cardId)
    {
        $card = Card::find($cardId);

        return response()->json()->success(201, "OK", new CurrentCardResource($card));
    }

    public function member($id, $cardId, $userId)
    {
        $cardMemb = UserCard::where('card_id', $cardId)->get();
        $boardMemb = UserBoard::where('board_id', $id)->get();
        $user = User::find($userId);

        if (!$boardMemb->contains('user_id', $userId)) {
            return response()->json()->error(401, "Failed", ["errors" => "user not member"]);
        }

        if ($cardMemb->contains('user_id', $userId)) {
            $member = UserCard::where('user_id', $userId)->where('card_id', $cardId)->first();
            $member->delete();

            return response()->json()->success(201, "OK", ["message" => "member removed", "is_remove" => true, "user" => $user]);
        }

        UserCard::create([
            'user_id' => $userId,
            'card_id' => $cardId
        ]);

        return response()->json()->success(201, "OK", ["message" => "member assigned", "is_remove" => false, "user" => $user]);
    }
}
