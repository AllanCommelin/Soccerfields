<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MapController extends Controller
{
    public function index(){
        return view('profile.map');
    }

    public function getFields(){
        $fields = Auth::user()->profile->fields;
        return response()->json($fields);
    }
}
