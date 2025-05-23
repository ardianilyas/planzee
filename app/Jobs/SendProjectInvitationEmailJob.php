<?php

namespace App\Jobs;

use App\Mail\ProjectInvitationMail;
use App\Models\InviteUser;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendProjectInvitationEmailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public InviteUser $invite)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->invite->invitee)->send(new ProjectInvitationMail($this->invite));
    }
}
