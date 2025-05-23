export interface Task {
    id: string;
    title: string,
    status: string,
    priority: string
}

export interface Pivot {
    role?: string;
    status?: string;
    accepted_at?: string;
    created_at: string;
}

export interface User {
    id: string,
    name: string,
    email: string,
    created_at: string,
    pivot?: Pivot,
}

export interface Project {
    id: string;
    user_id: string;
    name: string;
    description: string,
    created_at: string,
    users: User[],
    tasks: Task[],
    invited_users?: User[],
    creator: User,
    users_count: number,
    tasks_count: number,
}