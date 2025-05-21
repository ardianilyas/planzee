import { Project, User } from "@/types/project";
import { usePage } from "@inertiajs/react";

export const useIsProjectCreator = (project: Project | null) => {
    const { props } = usePage<{ auth: { user: User } }>();
    const user = props.auth.user;
    return project?.user_id === user.id;
}