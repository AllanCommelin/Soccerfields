@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
@endsection

@section('content')
    <div id="map"></div>
    <div class="fields">
        <ul>
            @foreach ($fields as $field)
                <li class="field" 
                    data-type="rectangle" 
                    data-name="{{ $field->name }}" 
                    data-north="{{ $field->north }}" 
                    data-east="{{ $field->east }}" 
                    data-south="{{ $field->south }}" 
                    data-west="{{ $field->west }}">
                    {{ $field->name }} 
                    <button class="deleteField" data-id="{{ $loop->index }}">Supprimer le terrain</button>
                </li>
            @endforeach
        </ul>
    </div>
@endsection

@section('js')
    <script src="{{ asset('js/map.js') }}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3n8piKfc8k-M8srv3t05ZC10nwoAaov4&libraries=drawing&callback=initMap"
         async defer>
    </script>
@endsection