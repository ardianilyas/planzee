<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];

    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'project_users')->withPivot('role')->withTimestamps();
    }

    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }
}
