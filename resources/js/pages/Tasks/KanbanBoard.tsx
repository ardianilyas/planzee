import React, { useMemo, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import DroppableColumn from './DroppableColumn';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { useFlashToast } from '@/hooks/useFlashToast';

interface Asignee {
    name: string,
}

interface Task {
    id: string,
    title: string,
    status: 'todo' | 'in_progress' | 'done',
    priority: 'low' | 'medium' | 'high',
    asignee: Asignee,
}

interface Project {
    id: string,
    name: string
}

interface Column {
    id: string,
    title: string,
    color: string,
}

interface KanbanBoardProps {
    tasks: Task[],
    project: Project,
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ project, tasks: initialTasks }) => {
    useFlashToast()

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const columns: Column[] = [
        { id: 'todo', title: 'To Do', color: 'blue' },
        { id: 'in_progress', title: 'In Progress', color: 'yellow' },
        { id: 'done', title: 'Done', color: 'green' },
    ];

    const priorityOrder: Record<Task['priority'], number> = {
        low: 1,
        medium: 2,
        high: 3,
    };

    const tasksByColumn = useMemo(() => {
        const grouped: { [key: string]: Task[] } = {};
        columns.forEach((col) => {
            grouped[col.id] = tasks.filter((task) => task.status === col.id).sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        });
        return grouped;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks])

    const sensors = useSensors(
        useSensor(PointerSensor), useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if(!over) return;
        const activeTaskId = active.id as string;
        const overId = over.id as string;

        const sourceColumn = columns.find((col) => tasksByColumn[col.id].some((task) => task.id === activeTaskId));
        const destColumn = columns.find((col) => col.id === overId || tasksByColumn[col.id].some((task) => task.id === overId));

        if(!sourceColumn || !destColumn) return;

        if(sourceColumn.id === destColumn.id) {
            const oldIndex = tasksByColumn[sourceColumn.id].findIndex((task) => task.id === activeTaskId);
            const newIndex = tasksByColumn[sourceColumn.id].findIndex((task) => task.id === overId);

            if(oldIndex !== newIndex) {
                const newTasks = [...tasks];
                const sourceTasks = tasksByColumn[sourceColumn.id];
                const reorderedTasks = arrayMove(sourceTasks, oldIndex, newIndex);
                const otherTasks = newTasks.filter((task) => task.status !== sourceColumn.id);
                setTasks([...otherTasks, ...reorderedTasks]);
            }
        } else {
            const task = tasks.find((t) => t.id === activeTaskId);
            if(!task) return;
            const newTasks = tasks.map((t) => 
                t.id === activeTaskId ? { ...task, status: destColumn.id as Task['status'] } : t
            )
            setTasks(newTasks);

            router.patch(`/dashboard/tasks/${task.id}`, { status: destColumn.id }, {
                onSuccess: () => {
                    toast.success('Task status updated successfully');
                },
                onError: (errors: unknown) => {
                    console.error('Failed to update task status:', errors);
                    setTasks(tasks);
                }
            })
        }

    }
    
    function getPriorityBadgeClass(priority: string) {
        switch (priority) {
            case 'high':
                return 'bg-red-100/60 text-red-700';
            case 'medium':
                return 'bg-yellow-100/60 text-yellow-700';
            case 'low':
                return 'bg-green-100/60 text-green-700';
            default:
                return 'bg-gray-500';
        }
    }

    return (
        <>
        <Head title="Kanban Board" />
        <AppLayout>
            <h1 className="text-2xl font-bold mb-6">{project.name} - Task Board</h1>
            <div className="p-6 min-h-screen rounded-md shadow-md">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {columns.map((column) => (
                        <DroppableColumn key={column.id} id={column.id} title={column.title} taskCount={tasksByColumn[column.id].length} color={column.color}>
                            <SortableContext items={tasksByColumn[column.id].map((task) => task.id)} strategy={verticalListSortingStrategy}>
                            {tasksByColumn[column.id].map((task) => (
                                <SortableItem key={task.id} id={task.id}>
                                    <div className="bg-white p-4 rounded-md shadow-md mb-3 border border-gray-200 hover:shadow-lg transition-shadow">
                                        <span
                                        className={`text-xs font-medium px-5 py-1 rounded-sm ${getPriorityBadgeClass(task.priority)}`}
                                        >
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </span>
                                        <h3 className="mt-2 font-semibold text-gray-800">{task.title}</h3>
                                        <p className='text-sm text-neutral-600'>Assigned to : {task.asignee.name} </p>
                                    </div>
                                </SortableItem>
                            ))}
                            </SortableContext>
                        </DroppableColumn>  
                    ))}
                    </div>
                </DndContext>
            </div>
        </AppLayout>
        </>
    );
}

export default KanbanBoard