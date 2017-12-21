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
/*
Route::get('/votes/create','VotesController@create');
Route::get('/votes','VotesController@show');
Route::get('/votes/range','VotesController@range');
Route::post('/votes','VotesController@store');
Route::get('/votes/{id}/edit','VotesController@edit');

Route::get('votes/updated','VoteUpdateController@show');
Route::post('/votes/update','VoteUpdateController@store');
Route::get('/votes/view','VoteUpdateController@view');*/

Route::get('/','DashboardController@index');
Route::get('/votes','VotesController@index');
Route::get('/create_vote','VotesController@createVoteView');