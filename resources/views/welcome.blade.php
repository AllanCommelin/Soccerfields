@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/home.css') }}" >
@endsection
@section('content')
    <header>
        <div class="sf-content">
            <h2>Bienvenue sur</h2>
            <h1>SoccerFields</h1>
        </div>
        <div class="sf-btn-container">
            <a class="sf-main-button -white" href="#discover">Découvrir</a>
        </div>
    </header>
    <div id="discover" class="sf-main">
        <div class="sf-text text-center mb-3">
            <p>
                <span>SoccerFields</span> vous permet de créer des plan de stade. Plus précisément de définir les terrains
                de football disponibles et de les nommer.
            </p>
        </div>
        <div class="sf-register">
            <h3>S'inscrire dès maintenant</h3>
            <a class="sf-secondary-button mt-2" href="{{ route('register') }}">{{ __('auth.register') }}</a>
        </div>
        <div class="sf-text text-center">
            <p class="text-left">Vous avez ainsi la possibilité de :</p>
            <ul class="text-left">
                <li>Dessiner vos terrains sur une carte a l'aide de différents outils (rectangle et polygone)</li>
                <li>Nommer vos terrains</li>
                <li>Sauvegarder vos terrains</li>
                <li>Supprimer vos terrains</li>
            </ul>
            <a class="sf-secondary-button outline mt-3" href="{{ url('/guide') }}">Guide d'utilisation</a>
        </div>
    </div>
@endsection