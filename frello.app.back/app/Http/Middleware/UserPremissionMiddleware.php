<?php

namespace App\Http\Middleware;

use App\Models\Board;
use App\Models\Card;
use App\Models\Checklist;
use App\Models\Comment;
use App\Models\Task;
use App\Models\UserBoard;
use App\Models\UserComment;
use Closure;
use Illuminate\Http\Request;

class UserPremissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        $boardId = $request->id;
        $cardId =  $request->cardId;
        $checlistId =  $request->checkId;
        $members = UserBoard::where('board_id', $boardId)->get();

        if (!$boardId) {
            return response()->json()->error(401, "failed", "not found");
        }

        if (!$members->contains('user_id', $user->id)) {
            return response()->json()->error(401, "failed", "not found");
        }

        if ($cardId) {
            $card = Card::find($cardId);
            $checlistId =  $request->checkId;
            $commentId = $request->commentId;

            if (!$card) {
                return response()->json()->error(401, "failed", "not found");
            }

            $board = $card->column->board;

            if ($board->id != $boardId) {
                return response()->json()->error(401, "failed", "not found");
            }

            if (!$boardId) {
                return response()->json()->error(401, "failed", "not found");
            }

            if ($commentId) {
                $comment = Comment::find($commentId);

                if ($comment->user->id !== $user->id) {
                    return response()->json()->success(404, "failure", ["message" => 'it\'s not your']);
                }

                if (!$comment) {
                    return response()->json()->error(401, "failed", "not found");
                }

                $response = $next($request);
                $content = $response->getContent();

                return $response->setContent($content);
            }

            if ($checlistId) {
                $checklists = Checklist::where('card_id', $cardId)->get();
                $taskId = $request->taskId;

                if (!$checklists->contains('id', $checlistId)) {
                    return response()->json()->error(401, "failed", "not found");
                }

                if ($taskId) {
                    $tasks = Task::where('checklists_id', $checlistId)->get();

                    if (!$tasks->contains('id', $taskId)) {
                        return response()->json()->error(401, "failed", "not found");
                    }

                    $response = $next($request);
                    $content = $response->getContent();

                    return $response->setContent($content);
                }

                $response = $next($request);
                $content = $response->getContent();

                return $response->setContent($content);
            }

            $response = $next($request);
            $content = $response->getContent();

            return $response->setContent($content);
        }

        $response = $next($request);
        $content = $response->getContent();

        return $response->setContent($content);
    }
}
