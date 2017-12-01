<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VoteUpdate;
use App\Votes;

class VoteUpdateController extends Controller
{
    public  function show(){
        $votes = Votes::all('vote');
        $updated_votes =VoteUpdate::latest()->get();
        return view('updated_votes',compact('updated_votes','votes'));
    }

    public  function store(){
        VoteUpdate::create(\request(['vote','allocation','plus','minus','total','Note','year']));
        votes::where('vote','=',\request('vote'))->update([
            'allocate'=>\request('total')
        ]);
        return $this->show();
    }

    public function view()
    {

            $vote = url($_GET['vote']);
            $vote = substr($vote, 16);

        //dd($vote);
        $votes = Votes::all('vote');
        $updated_votes=VoteUpdate::where('vote','=',$vote)->get();
        return view('view_updated',compact('updated_votes','votes'));

    }
}
