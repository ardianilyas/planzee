<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class ProjectServices
{
    public function getProjects() {
        $userId = Auth::id();
        return Project::query()->where('user_id', $userId)->with(['users', 'tasks'])->get();
    }
}
