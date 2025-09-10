<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FixtureController;

//home: public list of fixtures not only for logged in users

Route::get('/', [FixtureController::class, 'index'])
    ->name('fixtures.index');

//route for favorite fixtures only for logged in users

Route::get('/dashboard', [FixtureController::class, 'favorites'])
    ->name('fixtures.favorites')
    ->middleware(['auth']);

Route::post('/dashboard/{fixture}/toggle-favorite', [FixtureController::class, 'toggleFavorite'])
    ->name('fixtures.toggle-favorite')
    ->middleware(['auth']);
