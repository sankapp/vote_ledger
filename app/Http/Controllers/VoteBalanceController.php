<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VotesBalance;
use \Config;

class VoteBalanceController extends Controller
{
   public function index(){
       return view('pagers.vote_balance');
   }

   public function show(){

       try{

           $allVote_balance = votesBalance::all();

           return response()->json([
               'status'    => 'success',
               'all_votes_balances' => $allVote_balance,
           ],200);

       }catch(Exception $exception){
           return response()->json([
               'status'=>'error',
               'massage' => $exception->getMessage()
           ],200);


       }
   }

   public function filter(Request $request){

       if(!$request->has('vote','year','begin_date','end_date')){
           return response()->json([
               'status'=>'error',
               'massage'=>Config::get('custom_alerts.ALL_FIELDS_REQ')
           ],200);
       }

       // validate search vote filed required ------------------------------
       if(!$request->has('vote')){
           return response()->json([
               'status'=>'error',
               'massage'=>Config::get('custom_alerts.VOTE_REQ')
           ],200);
       }

       // validate search vote filed exist in DB ------------------------------
       if($request->has('vote')){
           $search_vote = VotesBalance::where('vote','LIKE',$request->vote.'%')->get();
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
       if($request->has('year')){
           $search_vote = VotesBalance::where('year','=',$request->year)->get();
           if(count($search_vote)==null){
               return response()->json([
                   'status'=>'error',
                   'massage'=>Config::get('custom_alerts.NO_SUCH_YEAR')
               ],200);
           }
       }

       if($request->begin_date > $request->end_date){
           return response()->json([
               'status' => 'error',
               'massage' => Config::get('custom_alerts.VALID_DATE_RANGE_REQ')
           ], 200);
       }

       try{
           $vote_balance_details = VotesBalance::where([
               ['vote','like',$request->vote.'%'],
               ['year','=',$request->year],])
               ->whereBetween('voucher_date',[$request->begin_date,$request->end_date])
               ->get();

           $vote_balance_details_sum = VotesBalance::where([
               ['vote','like',$request->vote.'%'],
               ['year','=',$request->year],])
               ->whereBetween('voucher_date',[$request->begin_date,$request->end_date])
               ->sum('payment_val');
           return response()->json([
               'status' => 'success',
               'vote_balance' => $vote_balance_details,
               'vote_balance_sum' => $vote_balance_details_sum,
           ], 200);



       }catch(Exception $exception){
           return response()->json([
               'status' => 'error',
               'massage' => $exception->getMessage()
           ], 200);
       }



   }

   public function createVoteBalanceByUpdate($vote,$year,$changed_amount,Request $request){
       $latest_balance = VotesBalance::where([
           ['vote','=',$vote],
           ['year','=',$year]
       ])->latest()
           ->value('new_val');

       $new_val=  $latest_balance - $changed_amount;

       $vote_balance = new VotesBalance();
       $vote_balance->vote = $vote;
       $vote_balance->year = $year;
       $vote_balance->current_val = $latest_balance;
       $vote_balance->payment_val = $changed_amount;
       $vote_balance->voucher_no = 'VOTE CHANGE';
       $vote_balance->voucher_date = 'VOTE CHANGE';
       $vote_balance->new_val = $new_val;

       if($vote_balance->save()) {
           $new_vote_balance = $request->all();
           $new_vote_balance['id'] = $request->id;

           return $new_vote_balance;
       }

   }
}
