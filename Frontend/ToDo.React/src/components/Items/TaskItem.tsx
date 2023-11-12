import Task from "@/models/Task";
import { FC } from 'react';

interface TaskItemProps {
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task, ...props }) => {
    return (
        <div className="w-32 h-32 border border-zinc-500 mb-2 me-4 p-2">
            {task.Name}
        </div>
    );
};

export default TaskItem;