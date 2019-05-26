@extends('layouts.app')
@section('css')
<link rel="stylesheet" href="{{ asset('css/home.css') }}" >
@endsection

@section('content')
    <div class="sf-main mt-5">
        <div class="sf-text text-center">
            <h3 class="text-left">Guide d'utilisation</h3>
            <ul class="text-left">
                <li>Sélectionner un outil</li>
                <li>Dessiner votre terrain</li>
                <li>Donnez-lui un nom</li>
                <li>Cliquez sur le terrain pour afficher son nom</li>
                <li>Cliquer sur l'icone <i class="fas fa-trash-alt"></i> dans la liste pour supprimer un terrain</li>
            </ul>
            <a class="sf-secondary-button outline mt-3" href="{{ url('/map') }}">Carte des terrains</a>
        </div>
    </div>
@endsection
