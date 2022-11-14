<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcessUrlToken extends Model
{
    use HasFactory;

    protected $table = 'acess_url_tokens';

    protected $fillable = [
        'board_id', 'token'
    ];
}
