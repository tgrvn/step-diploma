<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $hidden = ['id'];

    public function board()
    {
        return $this->morphOne('App\Models\Board', 'theme');
    }
}
