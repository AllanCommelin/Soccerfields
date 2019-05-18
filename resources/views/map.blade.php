@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
@endsection

@section('content')
    <div id="map"></div>
    <div class="fields">
        <ul>
            <li>Terrain1</li>
            <li>Terrain2</li>
            <li>Terrain3</li>
        </ul>
    </div>
@endsection

@section('js')
    <script src="{{ asset('js/map.js') }}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3n8piKfc8k-M8srv3t05ZC10nwoAaov4&libraries=drawing&callback=initMap"
         async defer>
    </script>
@endsection