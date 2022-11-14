<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCard extends Model
{
    use HasFactory;

    protected $table = 'users_cards';

    public $timestamps = false;

    protected $fillable = [
        'user_id', 'card_id',
    ];
}
