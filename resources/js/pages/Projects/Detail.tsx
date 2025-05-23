import Card from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIsProjectCreator } from '@/hooks/useIsProjectCreator'
import AppLayout from '@/layouts/app-layout'
import { Project } from '@/types/project'
import { Head, router } from '@inertiajs/react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFlashToast } from '@/hooks/useFlashToast'

type Props = {
    project: Project,
    roles: string[]
}

export default function Detail({ project, roles }: Props) {   
    const isCreator = useIsProjectCreator(project);
    const { users } = project;

    useFlashToast();

    const handleRoleChange = (userId: string, newRole: string) => {
        router.put(route('dashboard.projects.updateRole', [project.id, userId]), {
            role: newRole,
        }, {
            preserveScroll: true,
        })
    }

    return (
        <>
            <Head title={project.name} />
            <AppLayout title={project.name} desc={project.description} >
                <div className="flex flex-col gap-4">
                    <Card>
                        <div className='flex gap-4 items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-full'>

                            </div>
                            <div>
                                <h2 className='font-medium text-neutral-800'> {project.creator.name} </h2>
                                <p className='text-muted-foreground'> Creator </p>
                            </div>

                        </div>
                        {isCreator && 
                            <div className='my-4 max-w-lg'>
                                <form action="" className='w-full flex gap-2 items-end'>
                                    <div className='w-full'>
                                        <Label>Invite a new member</Label>
                                        <Input placeholder='Enter user email to invite' />
                                    </div>
                                    <Button type='submit'>
                                        <PaperPlaneIcon />
                                        Invite
                                    </Button>
                                </form>
                            </div>
                        }
                    </Card>
                    <Card>
                        <h2 className='font-medium text-xl text-neutral-800 mb-3'> Members </h2>
                        {users.length === 0 && <p className='text-muted-foreground'> No members yet </p>}
                        <Table>
                            <TableCaption>Member project list.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined at</TableHead>
                                    <TableHead>Change role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell> {user.name} </TableCell>
                                            <TableCell> {user.email} </TableCell>
                                            <TableCell> {user.pivot?.role} </TableCell>
                                            <TableCell> {user.pivot?.created_at} </TableCell>
                                            <TableCell>
                                                <Select onValueChange={(value) => handleRoleChange(user.id, value)} defaultValue={user.pivot?.role}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {roles.map((role, index) => (
                                                            <SelectItem key={index} value={role}>{role}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </AppLayout>
        </>
    )
}