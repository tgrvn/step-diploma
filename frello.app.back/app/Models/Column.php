<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;

    protected $hidden = ['pivot', 'board_id'];


    protected $table = 'columns';

    protected $fillable = [
        'board_id', 'name', 'index'
    ];

    public function board()
    {
        return $this->belongsTo(Board::class, 'board_id', 'id');
    }

    public function cards()
    {
        return $this->hasMany(Card::class, 'column_id', 'id')->orderBy("index");
    }
}
