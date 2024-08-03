<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;

class HistoryController extends Controller
{
    public function add(Request $request)
    {
        $request->validate([
            'ip' => 'required|ip',
        ]);

        History::create(['ip' => $request->ip]);
        return response()->json(['message' => 'History added'], 201);
    }

    public function get()
    {
        return response()->json(History::all());
    }

    public function delete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:histories,id',
        ]);

        History::whereIn('id', $request->ids)->delete();

        return response()->json(['message' => 'History items deleted successfully.']);
    }
}
