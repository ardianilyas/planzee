<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class InviteUser extends Pivot
{
    /** @use HasFactory<\Database\Factories\InviteUserFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $table = 'invite_users';

    protected function casts()
    {
        return [
            'created_at' => 'datetime: l, d F Y H:i:s',
            'accepted_at' => 'datetime: l, d F Y H:i:s'
        ];
    }

    public function inviter(): BelongsTo {
        return $this->belongsTo(User::class, 'invited_by');
    }

    public function invitee(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
