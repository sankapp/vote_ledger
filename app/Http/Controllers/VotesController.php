<?php

namespace App\Http\Controllers;

use App\VoteUpdate;
use App\VoteUpdates;
use Illuminate\Http\Request;
use App\votes;
use Illuminate\Support\Facades\Input;
use Mockery\Exception;
use \Config;

class VotesController extends Controller
{
    public function index(){
        return view('vote');
    }

    public function create(Request $request){
        if(!$request->has('vote')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.VOTE_REQ')
            ]);
        }

        if(!$request->has('allocate')){
            return response()->json([
                'status'=>'error',
                'massage'=> Config::get('custom_alerts.ALLOCATE_REQ')
            ],200);
        }

        if(!$request->has('year')){
            return response()->json([
                'status'=>'error',
                'massage'=> Config::get('custom_alerts.YEAR_REQ')
            ],200);
        }

        if($request->has('vote','year')){
            $check_vote=votes::where([
                ['vote','=',$request->vote],
                ['year','=',$request->year],
            ])->get();

                if(count($check_vote)!= null){
                    return response()->json([
                        'status'=>'error',
                        'massage'=> Config::get('custom_alerts.ALREADY_EXIST')
                    ],200);
                }
        }



        try{

            $vote = new votes();
            $vote->vote = $request->vote;
            $vote->allocate = $request->allocate;
            $vote->year = $request->year;
                if($vote->save()) {
                    $new_vote = $request->all();
                    $new_vote['id']=$vote->id;

                    return response()->json([
                        'status'=>'success',
                        'Create_Vote' => $new_vote
                    ],200);
                }

        }catch(Exception $exception){
                    return response()->json([
                        'status'=>'error',
                        'massage' => $exception->getMessage()
                    ],200);
        }
    }



    public function show()
    {
       try{

           $allVotes = votes::all();
           $allVotes_sum = votes::all()->sum('allocate');
           return response()->json([
                'status'    => 'success',
                'all_votes' => $allVotes,
                'allvotes_sum' => $allVotes_sum
           ],200);

       }catch(Exception $exception){
            return response()->json([
                'status'=>'error',
                'massage' => $exception->getMessage()
            ],200);


       }

    }

    public function filter(Request $request){

        // validate search vote filed required ------------------------------
        if(!$request->has('vote')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.VOTE_REQ')
            ],200);
        }

        // validate search vote filed exist in DB ------------------------------
        if($request->has('vote')){
            $search_vote = votes::where('vote','LIKE',$request->vote.'%')->get();
            if(count($search_vote)==null){
                return response()->json([
                    'status'=>'error',
                    'massage'=>Config::get('custom_alerts.NO_SUCH_VOTE')
                ],200);
            }
        }

        // validate year filed required ------------------------------
        if(!$request->has('year')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.YEAR_REQ')
            ],200);
        }

        // validate year filed exist in DB ------------------------------
        if($request->has('vote')){
            $search_vote = votes::where('year','LIKE',$request->year.'%')->get();
            if(count($search_vote)==null){
                return response()->json([
                    'status'=>'error',
                    'massage'=>Config::get('custom_alerts.NO_SUCH_YEAR')
                ],200);
            }
        }

        $filtered_votes = votes::where('vote','LIKE',$request->vote.'%')->get();
        $filtered_votes_sum = votes::where('vote','LIKE',$request->vote.'%')->sum('allocate');
        return response()->json([
            'status'=>'success',
            'filtered_votes' => $filtered_votes,
            'filtered_votes_sum' => $filtered_votes_sum
        ],200);


    }

    public  function edit(Request $request){

        // validate search deduct vote filed required ------------------------------
        if(!$request->has('deduct_vote')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.DEDUCT_VOTE_REQ')
            ],200);
        }

        // validate search deduct vote filed exist in DB ------------------------------
        if($request->has('deduct_vote')){
            $search_vote = votes::where('vote','=',$request->deduct_vote)->get();
            if(count($search_vote)==null){
                return response()->json([
                    'status'=>'error',
                    'massage'=>Config::get('custom_alerts.NO_SUCH_VOTE')
                ],200);
            }
        }

        // validate search add vote filed required ------------------------------
        if(!$request->has('add_vote')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.ADD_VOTE_REQ')
            ],200);
        }

        // validate search add vote filed exist in DB ------------------------------
        if($request->has('add_vote')){
            $search_vote = votes::where('vote','=',$request->add_vote)->get();
            if(count($search_vote)==null){
                return response()->json([
                    'status'=>'error',
                    'massage'=>Config::get('custom_alerts.NO_SUCH_VOTE')
                ],200);
            }
        }

        // validate year filed required ------------------------------
        if(!$request->has('year')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.YEAR_REQ')
            ],200);
        }

        // validate year filed exist in DB ------------------------------
        if($request->has('vote')){
            $search_vote = votes::where('year','=',$request->year)->get();
            if(count($search_vote)==null){
                return response()->json([
                    'status'=>'error',
                    'massage'=>Config::get('custom_alerts.NO_SUCH_YEAR')
                ],200);
            }
        }

        $deduct_vote_details = votes::where('vote','=',$request->deduct_vote)->get();
        $add_vote_details = votes::where('vote','=',$request->add_vote)->get();
        return response()->json([
           'status'=>'success',
           'deduct_vote_details'=>$deduct_vote_details,
           'add_vote_details'=>$add_vote_details,
        ],200);

    }


    public  function update(Request $request){
        if(!$request->has('changed_amount')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.EDIT_VOTE_VAL_REQ')
            ],200);
        }

        if(!$request->has('Note')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.NOTE_REQ')
            ],200);
        }

        if(!$request->has('year')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.YEAR_REQ')
            ],200);
        }

        try{
            $vote_val = new VoteUpdates();
            $vote_val->d_vote = $request->d_vote;
            $vote_val->d_allocation = $request->d_allocation;
            $vote_val->changed_d_allocation = $request->changed_d_allocation;
            $vote_val->a_vote = $request->a_vote;
            $vote_val->a_allocation = $request->a_allocation;
            $vote_val->changed_a_allocation = $request->changed_a_allocation;
            $vote_val->changed_amount = $request->changed_amount;
            $vote_val->Note = $request->Note;
            $vote_val->year = $request->year;

            if($vote_val->save()){
                $new_vote_val = $request->all();
                $new_vote_val['id']=$request->id;
                $change_d_val = votes::where('vote','=',$vote_val->d_vote)
                                ->update([
                                    'allocate'=>$vote_val->changed_d_allocation
                                ]);
                $change_a_val = votes::where('vote','=',$vote_val->a_vote)
                                ->update([
                                    'allocate'=>$vote_val->changed_a_allocation
                                ]);


                return response()->json([
                    'status'=>'success',
                    'new_vote_val'=>$new_vote_val,
                    'change_d_val'=>$change_d_val,
                    'change_a_val'=>$change_a_val,
                ],200);

            }


        }catch(Exception $exception){

                return response()->json([
                    'status'=>'error',
                    'massage' => $exception->getMessage()
                ],200);


        }
    }


    public function delete(Request $request){
        if(!$request->has('vote')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.VOTE_REQ')
            ],200);
        }

        if(!$request->has('year')){
            return response()->json([
                'status'=>'error',
                'massage'=>Config::get('custom_alerts.YEAR_REQ')
            ],200);
        }


        try {
            $delete_vote = votes::where([
                ['vote', '=', $request->vote],
                ['year', '=', $request->year],
            ])->delete();

            return response()->json([
                'status' => 'success',
                'delete' => $delete_vote
            ], 200);


        }catch (Exception $exception){
            return response()->json([
                'status' => 'error',
                'massage' => $exception->getMessage()
            ], 200);
        }
    }
}
