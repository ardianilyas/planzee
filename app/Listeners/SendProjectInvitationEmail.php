<?php

namespace App\Listeners;

use App\Events\UserInvitedToProject;
use App\Jobs\SendProjectInvitationEmailJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SendProjectInvitationEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserInvitedToProject $event): void
    {
        Log::info('Invitation sent to ' . $event->invite->invitee->email . ' at ' . now());
        SendProjectInvitationEmailJob::dispatch($event->invite);
    }
}
