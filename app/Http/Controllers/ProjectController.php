<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\ProjectServices;
use Illuminate\Http\Request;

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
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
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
}
