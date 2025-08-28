<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RugbyMatch extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'api_id',
        'match_date',
        'team_1',
        'team_2',
        'status',
        'team_1_score',
        'team_2_score',
    ];
}
