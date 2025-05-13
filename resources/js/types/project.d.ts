export interface Task {
    id: string;
    title: string,
    status: string,
    priority: string
}

export interface User {
    id: string,
    name: string,
    email: string,
}

export interface Project {
    id: string;
    name: string;
    description: string,
    created_at: string,
    users: User[],
    tasks: Task[]
}