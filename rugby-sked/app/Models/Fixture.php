<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'matches';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'team_1',
        'team_2',
        'date',
        'status',
        'score_1',
        'score_2',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_matches', 'matches_id', 'user_id')
            ->withTimestamps();
    }
}
