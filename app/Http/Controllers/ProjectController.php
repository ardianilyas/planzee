<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Events\UserInvitedToProject;
use App\Http\Requests\StoreProjectRequest;
use App\Mail\ProjectInvitationMail;
use App\Models\InviteUser;
use App\Models\Project;
use App\Models\User;
use App\Services\ProjectServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ProjectController extends Controller
{
    public function __construct(protected ProjectServices $projectServices) {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = $this->projectServices->getProjects();
        return inertia('Projects/Index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $this->projectServices->storeProject($request->validated());

        return redirect()->route('dashboard.projects.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load(['users', 'creator', 'invitedUsers']);
        $roles = RoleEnum::cases();
        return inertia('Projects/Detail', compact('project', 'roles'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }

    public function updateRole(Request $request, Project $project, User $user) {
        $project->users()->updateExistingPivot($user->id, ['role' => $request->role]);
        return redirect()->back()->with('success', 'Role updated successfully');
    }

    public function invite(Request $request, Project $project) {
        $request->validate([
            'email' => 'required|email'
        ]);

        $inviteUser = $this->projectServices->inviteUser($project, $request->email);

        event(new UserInvitedToProject($inviteUser));

        return back()->with('success', 'User invited successfully');
    }
}
