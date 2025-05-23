<?php

namespace App\Services;

use App\Models\User;
use App\Models\Project;
use App\Models\InviteUser;
use Illuminate\Support\Facades\Auth;

class ProjectServices
{
    public function getProjects() {
        $userId = Auth::id();
        return Project::query()->where('user_id', $userId)->withCount(['users', 'tasks'])->get();
    }

    public function storeProject(array $data) {
        $userId = Auth::id();
        return Project::query()->create([
            'name' => $data['name'],
            'description' => $data['description'],
            'repository_url' => $data['repository_url'],
            'user_id' => $userId
        ]);
    }

    public function inviteUser(Project $project, string $email) {
        $user = User::query()->where('email', $email)->first();

        if(!$user) {
            return back()->with('error', "The provided email doesn't exist");
        }

        return InviteUser::query()->create([
            'user_id' => $user->id,
            'invited_by' => Auth::id(),
            'project_id' => $project->id,
        ]);
    }
}
