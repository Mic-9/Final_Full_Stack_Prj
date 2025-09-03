<?php

namespace App\Http\Controllers;

use App\Models\Fixture;
use Illuminate\Http\Request;

class FixtureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fixtures = Fixture::orderBy('date', 'desc')->get();

        return response()->json($fixtures);
    }
}
