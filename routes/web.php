<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/map/fields', 'MapController@getFields');

Route::post('/map/addField', 'MapController@createNewField');
Route::post('/map/deleteField', 'MapController@deleteField');

Route::get('/map', 'MapController@index')->name('map');

Route::get('/home', 'HomeController@index')->name('home');
