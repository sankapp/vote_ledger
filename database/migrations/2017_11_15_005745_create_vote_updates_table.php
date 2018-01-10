<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVoteUpdatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_updates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('d_vote');
            $table->float('d_allocation','10','2');
            $table->float('changed_d_allocation','10','2');
            $table->string('a_vote');
            $table->float('a_allocation','10','2');
            $table->float('changed_a_allocation','10','2');
            $table->float('changed_amount','10','2');
            $table->text('Note');
            $table->string('year');
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
        Schema::dropIfExists('vote_updates');
    }
}
