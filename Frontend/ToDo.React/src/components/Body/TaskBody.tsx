import Task from "@/models/Task";
import { FC } from 'react';

interface TaskBodyProps {
    task: Task;
    exitCallBack: () => void;
}

const TaskBody: FC<TaskBodyProps> = ({ task, exitCallBack }) => {
    return (
        <div className="cursor-pointer" onClick={() => {
            exitCallBack();
        }}>
            {task.Name}
        </div>
    );
};

export default TaskBody;