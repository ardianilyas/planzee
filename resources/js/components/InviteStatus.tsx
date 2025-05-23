import React from 'react'

type Props = {
    status?: string
}

export default function InviteStatus({ status }: Props) {
    const baseClass = 'px-3 py-1 inline-flex text-xs rounded-full capitalized';
    let statusClass = '';
    switch (status) {
        case 'pending':
            statusClass = 'bg-yellow-200 text-yellow-800';
            break;
        case 'accepted':
            statusClass = 'bg-green-200 text-green-800';
            break;    
        case 'declined':
            statusClass = 'bg-red-200 text-red-800';
            break;    
        default:
            statusClass = 'bg-gray-200 text-gray-800';
            break;
    }
    return (
        <div className={`${baseClass} ${statusClass}`}>
            {status}
        </div>
    )
}