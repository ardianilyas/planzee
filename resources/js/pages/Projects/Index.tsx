import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Project } from '@/types/project';

interface Props {
    projects: Project[]
}

export default function Index({ projects }: Props) {
    const desc = 'Manage your projects, tasks, and teams in one place.';
    return (
        <>
            <Head title="Projects" />
            <AppLayout title='Projects' desc={desc}>
                <Table>
                    <TableCaption>Project list</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Tasks</TableHead>
                            <TableHead>Created at</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project, index) => (
                            <TableRow key={project.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>{project.users.length}</TableCell>
                                <TableCell>{project.tasks.length}</TableCell>
                                <TableCell>{project.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AppLayout>
        </>
    )
}