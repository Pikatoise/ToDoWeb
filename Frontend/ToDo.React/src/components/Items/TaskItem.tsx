import Task from "@/models/Task";
import { FC } from 'react';

interface TaskItemProps {
    task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task, ...props }) => {
    return (
        <div className="w-32 h-32 flex flex-col justify-between mb-2 me-4 px-2 pt-4 pb-2 shadow-md rounded-xl hover:shadow-lg">
            <div className="text-lg font-medium">
                {task.Name}
            </div>

            <div className="font-medium text-zinc-500">
                {
                    task.Description?.length!! > 30 ?
                        `${task.Description?.slice(0, 25)}...`
                        :
                        task.Description
                }
            </div>

            <div className="flex text-sm justify-between items-center me-2">
                {task.ExpiryDate?.toLocaleDateString()}

                <div className="w-2 h-2 rounded-full bg-red-600 " />
            </div>
        </div>
    );
};

export default TaskItem;