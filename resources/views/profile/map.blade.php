@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
@endsection

@section('content')
    <div id="map"></div>
    <div class="fields">
        <ul>
            <li class="field" 
                data-type="circle" 
                data-lat="48.92450138240447" 
                data-lng="2.3600200391895214" 
                data-radius="163.41125240201023">
                Terrain1
            </li>
            <li class="field" 
                data-type="circle" 
                data-lat="48.92307988524846"
                data-lng="2.362227832812323" 
                data-radius="32.957856872798736">
                Terrain2
            </li>
            <li class="field" 
                data-type="circle" 
                data-lat="48.92249857829099" 
                data-lng="2.357053286744531" 
                data-radius="98.9248235660144">
                Terrain3
            </li>
        </ul>
    </div>
@endsection

@section('js')
    <script src="{{ asset('js/map.js') }}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3n8piKfc8k-M8srv3t05ZC10nwoAaov4&libraries=drawing&callback=initMap"
         async defer>
    </script>
@endsection