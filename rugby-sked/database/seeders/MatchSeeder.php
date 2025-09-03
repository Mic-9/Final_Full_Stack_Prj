<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('matches')->insert([
            [
                'team_1' => 'Ireland(W)',
                'team_2' => 'Spain(W)',
                'date' => '2025-08-31 12:00:00',
                'status' => 'finished',
                'score_1' => 43,
                'score_2' => 27,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'New Zealand(W)',
                'team_2' => 'Japan(W)',
                'date' => '2025-08-31 14:00:00',
                'status' => 'finished',
                'score_1' => 62,
                'score_2' => 19,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Italy(W)',
                'team_2' => 'South Africa(W)',
                'date' => '2025-08-31 15:30:00',
                'status' => 'finished',
                'score_1' => 24,
                'score_2' => 29,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'France(W)',
                'team_2' => 'Brazil(W)',
                'date' => '2025-08-31 16:45:00',
                'status' => 'finished',
                'score_1' => 84,
                'score_2' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Uruguay(M)',
                'team_2' => 'Chile(M)',
                'date' => '2025-09-06 20:30:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Australia(M)',
                'team_2' => 'Argentina(M)',
                'date' => '2025-09-06 05:30:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'New Zealand(M)',
                'team_2' => 'South Africa(M)',
                'date' => '2025-09-06 08:05:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Samoa(M)',
                'team_2' => 'Fiji(M)',
                'date' => '2025-09-06 04:00:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
