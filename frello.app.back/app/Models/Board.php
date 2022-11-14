<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $hidden = ['pivot'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_boards');
    }

    public function columns()
    {
        return $this->hasMany(Column::class, 'board_id', 'id')->orderBy("index");
    }

    public function theme()
    {
        return $this->morphTo();
    }

    protected $fillable = [
        'name', 'theme_type', 'theme_id'
    ];
}
