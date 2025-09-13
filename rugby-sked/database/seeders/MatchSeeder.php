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
                'team_1' => 'New Zealand(M)',
                'team_2' => 'South Africa(M)',
                'date' => '2025-09-13 08:05:00',
                'status' => 'finished',
                'score_1' => 10,
                'score_2' => 43,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Australia(M)',
                'team_2' => 'Argentina(M)',
                'date' => '2025-09-13 05:00:00',
                'status' => 'finished',
                'score_1' => 26,
                'score_2' => 28,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Canada(W)',
                'team_2' => 'Australia(W)',
                'date' => '2025-09-13 16:00:00',
                'status' => 'finished',
                'score_1' => 46,
                'score_2' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'New Zealand(W)',
                'team_2' => 'South Africa(W)',
                'date' => '2025-09-13 14:00:00',
                'status' => 'finished',
                'score_1' => 46,
                'score_2' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'New Zealand(W)',
                'team_2' => 'Canada(W)',
                'date' => '2025-09-19 19:00:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'Wales(W)',
                'team_2' => 'Ireland(W)',
                'date' => '2025-09-20 15:30:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'New Zealand(M)',
                'team_2' => 'Australia(M)',
                'date' => '2025-09-27 6:05:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'team_1' => 'South Africa(M)',
                'team_2' => 'Argentina(M)',
                'date' => '2025-09-27 16:10:00',
                'status' => 'scheduled',
                'score_1' => null,
                'score_2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
