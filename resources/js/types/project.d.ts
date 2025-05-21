export interface Task {
    id: string;
    title: string,
    status: string,
    priority: string
}

export interface PivotRole {
    role: string;
}

export interface User {
    id: string,
    name: string,
    email: string,
    pivot?: PivotRole
}

export interface Project {
    id: string;
    user_id: string;
    name: string;
    description: string,
    created_at: string,
    users: User[],
    tasks: Task[],
    creator: User,
    users_count: number,
    tasks_count: number,
}