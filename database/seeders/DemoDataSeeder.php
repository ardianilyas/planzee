<?php

namespace Database\Seeders;

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

        $projects = Project::factory(3)->make()->each(function ($project) use ($users) {
            $creator = $users->random();
            $project->user_id = $creator->id;
            $project->save();

            $project->users()->attach($creator->id, [
                'role' => 'Admin',
            ]);

            $members = $users->where('id', '!=', $creator->id)->random(rand(2, 3));

            foreach($members as $member) {
                $project->users()->attach($member->id, [
                    'role' => fake()->randomElement(['UI Designer', 'Backend Developer', 'Frontend Developer', 'Project Manager', 'QA Tester']),
                ]);
            }

            Task::factory(5)->make()->each(function ($task) use ($project, $creator, $members) {
                $task->project_id = $project->id;
                $task->created_by = $creator->id;
                $task->assigned_to = $members->random()->id;
                $task->save();
            });
        });
    }
}
