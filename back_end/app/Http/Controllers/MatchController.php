<?php

namespace App\Http\Controllers;

use App\Models\RugbyMatch;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index()
    {
        $matches = RugbyMatch::all();
        return response()->json($matches);
    }
    public function store(Request $request)
    {
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
}
