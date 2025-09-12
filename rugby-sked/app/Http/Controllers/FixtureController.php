<?php

namespace App\Http\Controllers;

use App\Models\Fixture;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FixtureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $fixtures = Fixture::orderBy('date', 'desc')->get();

        /** @var \App\Models\User|null $user */
        $user = $request->user();

        $userFavorites = $user
            ? $user->fixtures()->pluck('matches_id')->toArray()
            : [];

        return Inertia::render('Welcome', [
            'fixtures' => $fixtures,
            'userFavorites' => $userFavorites,
            'auth' => ['user' => $user],
        ]);
    }

    public function favorites(Request $request): Response
    {
        /** @var \App\Models\User|null $user */
        $user = $request->user();

        $favorites = $user->fixtures()->orderBy('date', 'desc')->get();

        return Inertia::render('Dashboard', [
            'fixtures' => $favorites,
            'auth' => ['user' => $user]
        ]);
    }
    public function toggleFavorite(Fixture $fixture)
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login')
                ->with('error', 'You must be logged.');
        }

        if ($user->fixtures()->where('matches_id', $fixture->id)->exists()) {
            $user->fixtures()->detach($fixture->id);
        } else {
            $user->fixtures()->attach($fixture->id);
        }

        return redirect()->back();
    }
}
