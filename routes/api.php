<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

$api_version = env('API_VERSION');

Route::group(['prefix'=> $api_version],function(){

    Route::get('/votes','VotesController@show');
    Route::post('/votes','VotesController@create');
    Route::post('/votes/filter','VotesController@filter');
    Route::post('/votes/edit','VotesController@edit');
    Route::post('/votes/update','VotesController@update');
    Route::post('/votes/delete','VotesController@delete');

    Route::get('/updated_votes','VoteUpdateController@show');

    Route::get('/payments','PaymentController@show');
    Route::post('/payments','PaymentController@create');
    Route::post('/payments/delete','PaymentController@delete');
    Route::post('/payments/filter','PaymentController@filter');
    Route::get('/payments/getData','PaymentController@getData');

    Route::post('/add_new_vote_balance','PaymentController@addToVoteBalance');

    Route::get('/vote_balance','VoteBalanceController@show');
    Route::post('/vote_balance/filter','VoteBalanceController@filter');
});
