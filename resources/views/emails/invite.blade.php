<x-mail::message>
# Project Invitation from {{ $invite->inviter->name }}

Hi **{{ $invite->invitee->name }}**, you are invited to **{{ $invite->project->name }}'s** project. You can check this invitation on Planzee Dashboard.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
