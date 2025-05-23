<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory(5)->create();

        foreach ($users as $user) {
            $projects = Project::factory(3)->make()->each(function ($project) use ($user, $users) {
                $creator = $user->id;
                $project->user_id = $user->id;
                $project->save();
    
                $project->users()->attach($user->id, [
                    'role' => 'Admin',
                ]);
    
                $members = $users->where('id', '!=', $user->id)->random(rand(2, 3));
    
                foreach($members as $member) {
                    $project->users()->attach($member->id, [
                        'role' => fake()->randomElement(RoleEnum::cases()),
                    ]);
                }
    
                Task::factory(5)->make()->each(function ($task) use ($project, $user, $members) {
                    $task->project_id = $project->id;
                    $task->created_by = $user->id;
                    $task->assigned_to = $members->random()->id;
                    $task->save();
                });
            });
        }

    }
}
