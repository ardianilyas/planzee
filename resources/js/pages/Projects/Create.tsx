import Card from "@/components/Card";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout"
import { Head, useForm } from "@inertiajs/react"
import { toast } from "sonner";

export default function Create() {
    const desc = 'Create project to manage your tasks and teams.';
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        repository_url: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('dashboard.projects.store'), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('Something went wrong.');
            }
        });
    }
    return (
        <>
            <Head title="Create Project" />
            <AppLayout title="Create Project" desc={desc}>
                <Card>
                    <form onSubmit={handleSubmit} className="[&>div]:mb-3 max-w-xl">
                        <div>
                            <Label>Name</Label>
                            <Input type="text" placeholder="Saturn Project" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" placeholder="A short description about the project" value={data.description} onChange={e => setData('description', e.target.value)} />
                            {errors.description && <InputError message={errors.description} />}
                        </div>
                        <div>
                            <Label>Repository URL (optional)</Label>
                            <Input type="text" placeholder="" value={data.repository_url} onChange={e => setData('repository_url', e.target.value)} />
                            {errors.repository_url && <InputError message={errors.repository_url} />}
                        </div>
                        <div>
                            <Button disabled={processing}>
                                {processing ? 'Creating...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </AppLayout>
        </>
    )
}