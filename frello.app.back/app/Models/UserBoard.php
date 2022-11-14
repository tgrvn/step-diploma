<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBoard extends Model
{
    use HasFactory;

    protected $table = 'users_boards';

    public $timestamps = false;

    protected $fillable = [
        'user_id', 'board_id', 'role',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'user_id', 'id');
    }

    public function boards()
    {
        return $this->hasMany(Board::class, 'board_id', 'id');
    }
}