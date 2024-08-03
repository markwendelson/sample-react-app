<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeoController;
use App\Http\Controllers\HistoryController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/geo/{ip}', [GeoController::class, 'getGeoInfo'])->middleware('auth:sanctum');
Route::post('/history', [HistoryController::class, 'add'])->middleware('auth:sanctum');
Route::get('/history', [HistoryController::class, 'get'])->middleware('auth:sanctum');;
Route::post('/history/delete', [HistoryController::class, 'delete'])->middleware('auth:sanctum');
