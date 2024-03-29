@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/map.css') }}">
@endsection

@section('content')
    <div id="map"></div>
    <div class="list-group fields">
        <ul>
            @foreach ($fields as $field)
                @if($field->type == "rectangle")
                    <li class="list-group-item field"
                        data-type="{{ $field->type }}"
                        data-name="{{ $field->name }}"
                        data-north="{{ $field->north }}"
                        data-east="{{ $field->east }}"
                        data-south="{{ $field->south }}"
                        data-west="{{ $field->west }}">
                        <p>{{ $field->name }}</p>
                        <button type="button" class="btn btn-outline-danger deleteField" data-id="{{ $loop->index }}"><i class="fas fa-trash-alt"></i></button>
                    </li>
                @elseif($field->type == "polygon")
                    <li class="list-group-item field"
                        data-type="{{ $field->type }}"
                        data-name="{{ $field->name }}"
                        data-path="{{ json_encode($field->path) }}">
                        <p>{{ $field->name }}</p>
                        <button type="button" class="btn btn-outline-danger deleteField" data-id="{{ $loop->index }}"><i class="fas fa-trash-alt"></i></button>
                    </li>
                @endif
            @endforeach
        </ul>
        @if(empty($fields))
            <div class="sf-info">
                <p class="sf-text-info">
                    Vous n'avez aucun terrain sauvegardé !
                </p>
                <h3>Guide d'utilisation</h3>
                <ul>
                    <li>Sélectionner un outil</li>
                    <li>Dessiner votre terrain</li>
                    <li>Donnez-lui un nom</li>
                    <li>Cliquez sur le terrain pour afficher son nom</li>
                    <li>Cliquer sur l'icone <i class="fas fa-trash-alt"></i> dans la liste pour supprimer un terrain</li>
                </ul>
            </div>
        @endif
    </div>
@endsection

@section('js')
    <script src="{{ asset('js/map.js') }}"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3n8piKfc8k-M8srv3t05ZC10nwoAaov4&libraries=drawing&callback=initMap"
         async defer>
    </script>
@endsection