<?php

namespace App\Http\Controllers;

use App\payment;
use Illuminate\Http\Request;
use \Config;
use \App\votes;
use \App\VotesBalance;
use Mockery\Exception;

class PaymentController extends Controller
{
    public function index(){
        return view('pagers.payments');
    }


    public function createView(){
        return view('pagers.create_payment');
    }

    public function create(Request $request){
        if(!$request->has('vote')){
            return response()->json([
                'status'=>'error',
                'massage' => Config::get('custom_alerts.VOTE_REQ')
            ],200);
        }

        if(!$request->has('year')){
            return response()->json([
                'status'=>'error',
                'massage' => Config::get('custom_alerts.YEAR_REQ')
            ],200);
        }


        if(!$request->has('payment')){
            return response()->json([
                'status'=>'error',
                'massage' => Config::get('custom_alerts.PAYMENT_REQ')
            ],200);
        }

        if($request->has('vote','year')){
            $check_vote=votes::where([
                ['vote','=',$request->vote],
                ['year','=',$request->year],
            ])->get();

            if(count($check_vote)== null){
                return response()->json([
                    'status'=>'error',
                    'massage'=> Config::get('custom_alerts.NO_SUCH_VOTE')
                ],200);
            }
        }

        $payment = new payment();
        $payment->vote = $request->vote;
        $payment->year = $request->year;
        $payment->voucher_no = $request->voucher_no;
        $payment->voucher_date = $request->voucher_date;
        $payment->payment = $request->payment;

        try {
            if ($payment->save()) {
                $new_payment = $request->all();
                $new_payment['id'] = $request->id;

                $result = response()->json([
                    'status' => 'success',
                    'new_payment' => $new_payment,

                ], 200);

                if($result->status()==200) {

                    //add payment to vote balance table

                    $check_vote = VotesBalance::where([
                        ['vote', '=', $request->vote],
                        ['year', '=', $request->year],
                    ])->get();

                    if (count($check_vote) != null) {
                        $current_vote_val = VotesBalance::latest()
                            ->where([
                                ['vote', '=', $request->vote],
                                ['year', '=', $request->year],
                            ])->value('new_val');

                    } else {
                        $current_vote_val = votes::where([
                            ['vote', '=', $request->vote],
                            ['year', '=', $request->year],
                        ])->value('allocate');

                    }


                    $new_val = $current_vote_val - $request->payment;

                    $vote_balance = new VotesBalance();
                    $vote_balance->vote = $request->vote;
                    $vote_balance->year = $request->year;
                    $vote_balance->current_val = $current_vote_val;
                    $vote_balance->payment_val = $request->payment;
                    $vote_balance->new_val = $new_val;

                    if($vote_balance->save()) {
                        $new_vote_balance = $request->all();
                        $new_vote_balance['id'] = $request->id;

                        return response()->json([
                            'status'=>'success',
                            'new_vote_balance'=>$new_vote_balance
                        ],200);
                    }

                }
            }
        }catch(Exception $exception){
            return response()->json([
                'status' => 'error',
                'massage' => $exception->getMessage()
            ], 200);
        }
    }


    public function show()
    {
        try{

            $allPayments = payment::latest()->get();
            $allPayments_sum = payment::all()->sum('payment');
            return response()->json([
                'status'    => 'success',
                'all_payments' => $allPayments,
                'all_payments_sum' => $allPayments_sum
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

        if($request->has('vote','year')){
            $check_payment_votes = payment::where([
                ['vote','like',$request->vote.'%'],
                ['year','=',$request->year],
            ])->get();
            if(count($check_payment_votes)==null) {
                return response()->json([
                    'status' => 'error',
                    'massage' => Config::get('custom_alerts.NO_SUCH_VOTE')
                ], 200);
            }
        }

        if($request->begin_date > $request->end_date){
            return response()->json([
                'status' => 'error',
                'massage' => Config::get('custom_alerts.VALID_DATE_RANGE_REQ')
            ], 200);
        }

        try{
            $payment_range_details = payment::where([
                    ['vote','like',$request->vote.'%'],
                    ['year','=',$request->year],])
                ->whereBetween('voucher_date',[$request->begin_date,$request->end_date])
                ->get();

            $payment_range_details_sum = payment::where([
                ['vote','like',$request->vote.'%'],
                ['year','=',$request->year],])
                ->whereBetween('voucher_date',[$request->begin_date,$request->end_date])
                ->sum('payment');
            return response()->json([
                'status' => 'success',
                'filtered_payments' => $payment_range_details,
                'filtered_payments_sum' => $payment_range_details_sum,
            ], 200);



        }catch(Exception $exception){
            return response()->json([
                'status' => 'error',
                'massage' => $exception->getMessage()
            ], 200);
        }

    }



}
