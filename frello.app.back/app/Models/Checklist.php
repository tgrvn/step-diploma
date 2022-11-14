<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_id', 'name'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'checklists_id', 'id');
    }
}
