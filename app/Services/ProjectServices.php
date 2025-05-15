<?php

namespace App\Services;

use App\Models\Project;
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
}
