import Task from "@/models/Task";
import { FC, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import styles from "@/styles/TaskForm.module.css";

interface TaskBodyProps {
    task: Task;
    exitCallBack: () => void;
}

const TaskBody: FC<TaskBodyProps> = ({ task, exitCallBack }) => {
    const [name, setName] = useState(task.Name);
    const nameWidth = `w-[${name?.length! * 12}px]`;

    return (
        <div className="w-full min-h-full max-sm:pt-1">
            <div className="flex justify-center items-center max-sm:px-32 mb-2">
                <Input
                    className={`bg-zinc-300 border-0 text-2xl font-medium p-0 focus-visible:ring-0 focus-visible:ring-offset-0 underline ${nameWidth}`}
                    value={name?.toString()}
                    onChange={(e) => setName(e.target.value)} />
                <Pencil />
            </div>
        </div>
    );
};

export default TaskBody;