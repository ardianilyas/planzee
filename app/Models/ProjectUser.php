<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectUser extends Pivot
{
    /** @use HasFactory<\Database\Factories\ProjectUserFactory> */
    use HasFactory;

    protected $table = 'project_users';
    protected $guarded = ['id'];

    protected function casts()
    {
        return [
            'created_at' => 'datetime:l, d F Y'
        ];
    }
}
