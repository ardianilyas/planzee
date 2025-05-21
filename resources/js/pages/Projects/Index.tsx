import { Head, Link } from '@inertiajs/react';
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
import Card from '@/components/Card';
import { Button } from "@/components/ui/button"
import { PlusIcon } from '@radix-ui/react-icons'
import { useFlashToast } from '@/hooks/useFlashToast';

interface Props {
    projects: Project[]
}

export default function Index({ projects }: Props) {
    const desc = 'Manage your projects, tasks, and teams in one place.';

    useFlashToast();

    return (
        <>
            <Head title="Projects" />
            <AppLayout title='Projects' desc={desc}>
                <Card>
                    <Link href={route('dashboard.projects.create')}>
                        <Button>
                            <PlusIcon />
                            Create new project
                        </Button>
                    </Link>
                    <Table className='my-4'>
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
                                    <TableCell>
                                        <Link href={route('dashboard.projects.tasks.index', project.id)}>{project.name}</Link>
                                    </TableCell>
                                    <TableCell>{project.description}</TableCell>
                                    <TableCell>{project.users_count}</TableCell>
                                    <TableCell>{project.tasks_count}</TableCell>
                                    <TableCell>{project.created_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </AppLayout>
        </>
    )
}