<?php

namespace App\Http\Controllers;

use App\Models\RugbyMatch;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index(Request $request)
    {
        $query = RugbyMatch::query();

        if ($request->has('team')) {
            $team = $request->get('team');
            $query->where('team_1', 'LIKE', "%" . $team . "%")
                ->orWhere('team_2', 'LIKE', "%" . $team . "%");
        };

        if ($request->has('month') && $request->get('year')) {
            $query->whereMonth('match_date', $request->get('month'))
                ->whereYear('match_date', $request->get('year'));
        };

        $matches = $query->get();

        return response()->json($matches);
    }

    public function store(Request $request)
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'You do not have permission for this action.'], 403);
        }

        $validatedData = $request->validate([
            'api_id' => 'required|unique:matches|string|max:255',
            'match_date' => 'required|date_format:Y-m-d H:i:s',
            'team_1' => 'required|string',
            'team_2' => 'required|string',
            'status' => 'required|string',
            'team_1_score' => 'nullable|integer',
            'team_2_score' => 'nullable|integer',
        ]);

        $match = RugbyMatch::create($validatedData);
        return response()->json([
            'message' => 'Match created successfully',
            'match' => $match
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'You do not have permission for this action.'], 403);
        }

        $validatedData = $request->validate([
            'team_1_score' => 'nullable|integer',
            'team_2_score' => 'nullable|integer',
            'status' => 'nullable|string',
        ]);

        $match = RugbyMatch::findorFail($id);

        $match->update($validatedData);

        return response()->json([
            'message' => 'Match updated successfully',
            'match' => $match
        ]);
    }

    public function destroy(Request $request, $id)
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'You do not have permission for this action.'], 403);
        }

        $match = RugbyMatch::findorFail($id);
        $match->delete();

        return response()->json([
            'message' => 'Match deleted successfully',
        ], 200);
    }

    public function favorite(Request $request, RugbyMatch $match)
    {
        $request->user()->matches()->attach($match->id);

        return response()->json([
            'message' => 'Match added to favorites',
        ], 201);
    }

    public function favorites(Request $request)
    {
        $favoritesMatches = $request->user()->matches()->get();

        return response()->json($favoritesMatches);
    }

    public function unfavorite(Request $request, RugbyMatch $match)
    {
        $request->user()->matches()->detach($match->id);

        return response()->json([
            'message' => 'Match removed from favorites',
        ], 200);
    }
}
