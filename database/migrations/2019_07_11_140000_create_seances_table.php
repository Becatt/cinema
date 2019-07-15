<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seances', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('hall_id')->unsigned();
            $table->integer('movie_id')->unsigned();
            $table->date('day');
            $table->time('time');

            $table->foreign('hall_id')
                  ->references('id')
                  ->on('halls');

            $table->foreign('movie_id')
                  ->references('id')
                  ->on('movies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seances');
    }
}
