<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MatchController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
//USER
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


//MATCHES
Route::get('/matches', [MatchController::class, 'index']);
Route::middleware('auth:sanctum')->post('/matches', [MatchController::class, 'store']);
Route::middleware('auth:sanctum')->put('/matches/{id}', [MatchController::class, 'update']);
