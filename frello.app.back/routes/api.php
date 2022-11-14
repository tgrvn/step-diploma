<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\UserPremissionMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register'])->middleware("form");
Route::post('/login', [AuthController::class, 'login'])->middleware("form");

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::patch('/profile/update', [AuthController::class, 'update'])->middleware("form");
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/boards', [BoardController::class, 'index']);
    Route::post('/create-board', [BoardController::class, 'create'])->middleware("form");
    Route::get('/url-add-user/{token}', [BoardController::class, 'addUser']);

    Route::middleware(UserPremissionMiddleware::class)->group(function () {
        Route::get('/boards/{id}', [BoardController::class, 'show']);
        Route::patch('/boards/{id}/update-board', [BoardController::class, 'update'])->middleware("form");
        Route::delete('/boards/{id}/delete-board', [BoardController::class, 'drop']);
        Route::get('/boards/{id}/url-generate', [BoardController::class, 'createAccessUrl']);
        Route::delete('/boards/{id}/delete-premission/{user_id}', [BoardController::class, 'deleteUser']);

        Route::post('/boards/{id}/create-column', [ColumnController::class, 'create'])->middleware("form");
        Route::patch('/boards/{id}/update-column/{columnId}', [ColumnController::class, 'update'])->middleware("form");
        Route::delete('/boards/{id}/delete-column/{columnId}', [ColumnController::class, 'drop']);
        Route::patch('/boards/{id}/update-indexes', [ColumnController::class, 'updateIndexes']);

        Route::post('/boards/{id}/{columnId}/create-card', [CardController::class, 'create']);
        Route::patch('/boards/{id}/update-card-name/{cardId}', [CardController::class, 'updateName'])->middleware("form");
        Route::patch('/boards/{id}/update-card-descr/{cardId}', [CardController::class, 'updateDescription'])->middleware("form");
        Route::delete('/boards/{id}/delete-card/{cardId}', [CardController::class, 'drop'])->middleware("form");
        Route::get('/boards/{id}/card/{cardId}', [CardController::class, 'show']);
        Route::post('/boards/{id}/add-card-member/{cardId}/{userId}', [CardController::class, 'member']);

        Route::post('/boards/{id}/create-checklist/{cardId}', [ChecklistController::class, 'create'])->middleware("form");
        Route::patch('/boards/{id}/update-checklist/{cardId}/{checkId}', [ChecklistController::class, 'update'])->middleware("form");
        Route::delete('/boards/{id}/delete-checklist/{cardId}/{checkId}', [ChecklistController::class, 'drop']);

        Route::post('/boards/{id}/create-task/{cardId}/{checkId}', [TaskController::class, 'create'])->middleware("form");
        Route::patch('/boards/{id}/update-task/{cardId}/{checkId}/{taskId}', [TaskController::class, 'update'])->middleware("form");
        Route::delete('/boards/{id}/delete-task/{cardId}/{checkId}/{taskId}', [TaskController::class, 'drop']);
        Route::post('/boards/{id}/state-task/{cardId}/{checkId}/{taskId}', [TaskController::class, 'stateTask']);

        Route::post('/boards/{id}/create-comment/{cardId}', [CommentController::class, 'create'])->middleware("form");
        Route::patch('/boards/{id}/update-comment/{cardId}/{commentId}', [CommentController::class, 'update'])->middleware("form");
        Route::delete('/boards/{id}/delete-comment/{cardId}/{commentId}', [CommentController::class, 'drop']);
    });
});
