<?php

use App\Http\Controllers\ProjectController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$user = User::query()->first();
Auth::login($user);

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::resource('projects', ProjectController::class);
    Route::put('projects/{project}/user/{user}/role', [ProjectController::class, 'updateRole'])->name('projects.updateRole');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
