<?php

namespace App\Http\Controllers;

use App\VoteUpdates;
use Illuminate\Http\Request;
use App\VoteUpdate;
use App\Votes;

class VoteUpdateController extends Controller
{

    public function index()
    {
      return view('pagers.updated_votes');
    }

    public  function show(){
        {
            try{

                $updated_votes = VoteUpdates::latest()->get();
                return response()->json([
                    'status'    => 'success',
                    'updated_votes' => $updated_votes,
                ],200);

            }catch(Exception $exception){
                return response()->json([
                    'status'=>'error',
                    'massage' => $exception->getMessage()
                ],200);

            }

        }

    }


    public function filter(){


    }
}
