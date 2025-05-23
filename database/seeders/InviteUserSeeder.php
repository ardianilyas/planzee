<?php

namespace Database\Seeders;

use App\Models\InviteUser;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InviteUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();
        $projects = Project::all();

        foreach ($projects as $project) {
            $invitedUsers = $users->random(rand(4, 6));

            foreach ($invitedUsers as $user) {
                $status = fake()->randomElement(['pending', 'accepted', 'declined']);
                $accepted_at = null;

                if($status === 'accepted') {
                    $accepted_at = now()->subDays(rand(0, 10));
                }

                InviteUser::query()->create([
                    'user_id' => $user->id,
                    'project_id' => $project->id,
                    'invited_by' => $project->user_id,
                    'status' => $status,
                    'accepted_at' => $accepted_at,
                ]);
            }
        }
    }
}
