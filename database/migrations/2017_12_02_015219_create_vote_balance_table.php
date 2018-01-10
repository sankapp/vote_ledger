<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVoteBalanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_balance', function (Blueprint $table) {
            $table->increments('id');
            $table->string('payment_id')->nullable();
            $table->string('vote');
            $table->string('year');
            $table->float('current_val','10','2');
            $table->float('payment_val','10','2');
            $table->string('voucher_no')->nullable();
            $table->date('voucher_date')->nullable();
            $table->float('new_val','10','2');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vote_balance');
    }
}
