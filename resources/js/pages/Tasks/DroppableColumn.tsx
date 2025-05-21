import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableColumnProps {
  id: string;
  title: string;
  color: string,
  taskCount: number,
  children: React.ReactNode;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ id, title, color, taskCount, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg bg-neutral-50 shadow-md min-h-[600px] ${isOver ? 'ring-2 ring-blue-500' : ''}`}
    >
         <h2 className={`p-4 text-lg font-medium mb-4 border-b`}>
            {title}
            <span className={`ml-3 bg-${color}-100 text-${color}-700 px-3 py-0.5 rounded-sm inline-flex`}> {taskCount} </span>
        </h2>
        <div className="p-4 space-y-2">{children}</div>
    </div>
  );
};

export default DroppableColumn;