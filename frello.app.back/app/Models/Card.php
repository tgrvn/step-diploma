<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Column;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'column_id', 'name', 'description', 'index'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_cards');
    }

    public function column()
    {
        return $this->belongsTo(Column::class, 'column_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'card_id', 'id')->orderBy("created_at", "DESC");
    }

    public function checklists()
    {
        return $this->hasMany(Checklist::class, 'card_id', 'id')->orderBy("id", "DESC");
    }
}
