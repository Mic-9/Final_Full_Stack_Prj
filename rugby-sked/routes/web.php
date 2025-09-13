<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FixtureController;
use App\Http\Controllers\ProfileController;

//home: public list of fixtures not only for logged in users

Route::get('/', [FixtureController::class, 'index'])
    ->name('fixtures.index');

//route for favorite fixtures only for logged in users

Route::get('/dashboard', [FixtureController::class, 'favorites'])
    ->name('dashboard')
    ->middleware(['auth']);

Route::post('/dashboard/{fixture}/toggle-favorite', [FixtureController::class, 'toggleFavorite'])
    ->name('fixtures.toggle-favorite')
    ->middleware(['auth']);

//route profile

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
