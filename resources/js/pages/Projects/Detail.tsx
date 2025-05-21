import Card from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIsProjectCreator } from '@/hooks/useIsProjectCreator'
import AppLayout from '@/layouts/app-layout'
import { Project } from '@/types/project'
import { Head } from '@inertiajs/react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

type Props = {
    project: Project
}

export default function Detail({ project }: Props) {   
    const isCreator = useIsProjectCreator(project);
    const { users } = project;

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
                        {users.map((user) => (
                            <div key={user.id}>
                                <h4 className='font-medium text-neutral-800'> {user.name} </h4>
                                <p className='text-muted-foreground'> {user.pivot?.role} </p>
                            </div>
                        ))}
                    </Card>
                </div>
            </AppLayout>
        </>
    )
}