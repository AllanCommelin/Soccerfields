<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Profile;

class MapController extends Controller
{
    public function index(){
        $fields = Auth::user()->profile->fields;

        return view('profile.map', ['fields' => json_decode($fields)]);
    }

    public function getFields(){
        $fields = Auth::user()->profile->fields;
        return response()->json($fields);
    }

    public function createNewField(Request $request){
        if($request->type == "rectangle"){
            $newField = array(
                'type' => $request->type,
                'name' => $request->name,
                'north' => $request->north,
                'east' => $request->east,
                'south' => $request->south,
                'west' => $request->west,
            );
        }

        $profile = Auth::user()->profile;
        $fields = json_decode($profile->fields);
        array_push($fields, $newField);

        Profile::where('id', $profile->id)->update(['fields' => json_encode($fields)]);
        return $request;
    }

    public function deleteField(Request $request){
        $profile = Auth::user()->profile;
        $fields = json_decode($profile->fields, true);
        unset($fields[$request->id]);
        $newFields = array_values($fields);

        Profile::where('id', $profile->id)->update(['fields' => json_encode($newFields)]);
        return $fields;
    }
}
