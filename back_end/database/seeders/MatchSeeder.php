<?php

namespace Database\Seeders;

use App\Models\RugbyMatch;
use Illuminate\Database\Seeder;

class MatchSeeder extends Seeder
{
    public function run(): void
    {
        RugbyMatch::create(
            [
                'api_id' => '123456',
                'match_date' => "2025-08-24 16:30:00",
                'team_1' => 'New Zealand(W)',
                'team_2' => 'Spain(W)',
                'status' => 'finished',
                'team_1_score' => 54,
                'team_2_score' => 8,
            ]
        );

        RugbyMatch::create(
            [
                'api_id' => '789012',
                'match_date' => "2025-08-24 13:45:00",
                'team_1' => 'South Africa(W)',
                'team_2' => 'Brazil(W)',
                'status' => 'finished',
                'team_1_score' => 66,
                'team_2_score' => 6,
            ]
        );

        RugbyMatch::create(
            [
                'api_id' => '345678',
                'match_date' => "2025-08-24 11:00:00",
                'team_1' => 'Ireland(W)',
                'team_2' => 'Japan(W)',
                'status' => 'finished',
                'team_1_score' => 42,
                'team_2_score' => 14,
            ]
        );
        RugbyMatch::create(
            [
                'api_id' => '901234',
                'match_date' => "2025-11-1 16:10:00",
                'team_1' => 'England(M)',
                'team_2' => 'Australia(M)',
                'status' => 'scheduled',
                'team_1_score' => null,
                'team_2_score' => null,
            ]
        );
        RugbyMatch::create(
            [
                'api_id' => '567890',
                'match_date' => "2025-11-1 18:40:00",
                'team_1' => 'Scotland(M)',
                'team_2' => 'USA(M)',
                'status' => 'scheduled',
                'team_1_score' => null,
                'team_2_score' => null,
            ]
        );
        RugbyMatch::create(
            [
                'api_id' => '112233',
                'match_date' => "2025-11-15 21:10:00",
                'team_1' => 'France(M)',
                'team_2' => 'Fiji(M)',
                'status' => 'scheduled',
                'team_1_score' => null,
                'team_2_score' => null,
            ]
        );
    }
}
