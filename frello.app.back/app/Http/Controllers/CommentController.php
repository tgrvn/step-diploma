<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;

class CommentController extends Controller
{
    public function create(CommentRequest $request, $id, $cardId)
    {
        $validated = $request->validated();
        $user = auth()->user();

        $comment = Comment::create([
            'card_id' => $cardId,
            'user_id' => $user->id,
            'body' => $validated["body"],
        ]);

        $response = [
            'message' => 'comment created',
            'data' => new CommentResource($comment)
        ];

        return $response;
    }

    public function update(CommentRequest $request, $id, $cardId, $commentId)
    {
        $validated = $request->validated();
        $comment = Comment::find($commentId);

        $comment->update([
            'body' => $validated["body"]
        ]);

        $response = [
            'message' => 'comment updated'
        ];

        return $response;
    }

    public function drop($id, $cardId, $commentId)
    {
        $comment = Comment::find($commentId);
        $comment->delete();

        return response()->json()->success(201, "OK", ["message" => 'comment deleted']);
    }
}
