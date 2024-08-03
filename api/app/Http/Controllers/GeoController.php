<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeoController extends Controller
{
    public function getGeoInfo($ip)
    {
        $response = Http::get("https://ipinfo.io/{$ip}/geo");
        return response()->json($response->json());
    }
}
