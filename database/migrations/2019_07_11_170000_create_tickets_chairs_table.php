<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTicketsChairsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets_chairs', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('ticket_id')->unsigned();
            $table->integer('chair_id')->unsigned();

            $table->foreign('ticket_id')
                  ->references('id')
                  ->on('tickets');

            $table->foreign('chair_id')
                  ->references('id')
                  ->on('chairs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets_chairs');
    }
}
