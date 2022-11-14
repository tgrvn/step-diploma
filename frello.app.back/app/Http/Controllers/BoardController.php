<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBoardRequest;
use Illuminate\Support\Str;
use App\Http\Resources\IndexUserResource;
use App\Http\Resources\ShowBoardResource;
use App\Models\AcessUrlToken;
use App\Models\Board;
use App\Models\UserBoard;
use App\Models\UserCard;

class BoardController extends Controller
{

    public function index()
    {
        $user = auth()->user();

        return response()->json()->success(201, "OK", new IndexUserResource($user));
    }

    public function show($id)
    {
        $board = Board::find($id);

        return response()->json()->success(201, "OK", new ShowBoardResource($board));
    }

    public function create(CreateBoardRequest $request)
    {
        $userId = auth()->user()->id;

        $validated = $request->validated();
        $validated["theme_type"] = "App\\Models\\" . $validated["theme_type"];

        $board = Board::create($validated);

        UserBoard::create([
            'user_id' => $userId,
            'board_id' => $board->id,
        ]);

        $response = [
            'message' => 'board created succesful',
            'board' => $board
        ];

        return $response;
    }

    public function update(CreateBoardRequest $request, $id)
    {
        $board = Board::find($id);

        $validated = $request->validated();
        $validated["theme_type"] = "App\\Models\\" . $validated["theme_type"];

        $board->update($validated);

        $response = [
            'message' => 'board updated succesful'
        ];

        return $response;
    }

    public function drop($id)
    {
        $board = Board::find($id);

        if (!$board) {
            return response()->json()->error(404, "OK", ['message' => 'not found']);
        }

        $board->delete();

        return response()->json()->success(201, "OK", ['message' => 'board deleted']);
    }

    public function createAccessUrl($id)
    {
        $token = Str::uuid();

        AcessUrlToken::create([
            'board_id' => $id,
            'token' => $token,
        ]);

        $response = [
            'success' => 'true',
            'data' => $token,
        ];

        return response()->json()->success(201, "OK", $response);
    }

    public function addUser($token)
    {
        $userId = auth()->user()->id;
        $acessRow = AcessUrlToken::where('token', $token)->first();

        if (!$acessRow) {
            return response()->json()->error(401, "failure", ["errors" => "bad token", "id" => null]);
        }

        $members = UserBoard::where('board_id', $acessRow->board_id)->get();


        if ($members->contains('user_id', $userId)) {
            return response()->json()->success(201, "OK", ["message" => "you are already a board member", "id" => $acessRow->board_id]);
        }

        UserBoard::create([
            'user_id' => $userId,
            'board_id' => $acessRow->board_id
        ]);

        return response()->json()->success(201, "OK", ["messsage" => "welcome aboard", "id" => $acessRow->board_id]);
    }

    public function deleteUser($id, $user_id)
    {
        $premission = UserBoard::where('board_id', $id)->where('user_id', $user_id)->first();
        $columns = Board::find($id)->columns;
        $user = auth()->user();

        if (!$premission) {
            return response()->json()->error(404, "failure", ["message" => "user not found"]);
        }

        $columns->each(function ($column) use ($user_id) {
            $cards = $column->cards;

            $cards->each(function ($card) use ($user_id) {
                $userCard = UserCard::where('card_id', $card->id)->where('user_id', $user_id)->first();

                if ($userCard) {
                    $userCard->delete();
                }
            });
        });

        if ($user->id == $premission->user_id) {
            return response()->json()->error(401, "failure", ["message" => "you cant delete yourself"]);
        }

        $premission->delete();

        return response()->json()->success(201, "OK", ["message" => "user was deleted"]);
    }
}
