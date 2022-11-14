<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FrelloCreateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username');
        });

        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('hex');
        });

        Schema::create('backgrounds', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('img_path');
        });

        Schema::create('boards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->morphs('theme');
            $table->timestamps();
        });

        Schema::create('users_boards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('board_id');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('board_id')->references('id')->on('boards')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('columns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('board_id');
            $table->string('name');
            $table->integer('index')->nullable();
            $table->timestamps();

            $table->foreign('board_id')->references('id')->on('boards')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('column_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('index');
            $table->timestamps();

            $table->foreign('column_id')->references('id')->on('columns')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('users_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('card_id');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('card_id')->references('id')->on('cards')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('checklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('card_id');
            $table->string('name');
            $table->timestamps();

            $table->foreign('card_id')->references('id')->on('cards')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('checklists_id');
            $table->string('name');
            $table->boolean('is_done')->default(false);

            $table->foreign('checklists_id')->references('id')->on('checklists')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('card_id');
            $table->text('body');
            $table->timestamps();

            $table->foreign('card_id')->references('id')->on('cards')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });

        Schema::create('acess_url_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('token');
            $table->foreignId('board_id');
            $table->timestamps();

            $table->foreign('board_id')->references('id')->on('boards')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('acess_url_tokens');
        Schema::dropIfExists('users_comments');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('checklists');
        Schema::dropIfExists('users_cards');
        Schema::dropIfExists('cards');
        Schema::dropIfExists('columns');
        Schema::dropIfExists('users_boards');
        Schema::dropIfExists('boards');
        Schema::dropIfExists('backgrounds');
        Schema::dropIfExists('colors');
    }
}
