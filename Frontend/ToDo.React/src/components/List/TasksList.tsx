import { FC, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskItem from "@/components/Items/TaskItem";
import Folder from "@/models/Folder";
import Task from "@/models/Task";

interface TasksListBodyProps {
    folder: Folder | null,
    taskCallBack: (task: Task) => void;
}

const TasksListBody: FC<TasksListBodyProps> = ({ ...props }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    useEffect(() => {
        setTasks([]);

        for (let i = 0; i < 30; i++) {
            let task: Task =
            {
                Id: i,
                Name: `Task ${i + 1}`,
                FolderId: Math.floor(Math.random() * (4 - 1) + 1),
                Description: `Description of task dwdw fre wdwd${i + 1}`,
                ExpiryDate: new Date("2023-11-13"),
                Status: Math.floor(Math.random() * (2 - (-1)) + (-1))
            };
            setTasks(t => [...t, task]);
        }
    }, []);

    const tasksByFolder = props.folder != null ? tasks.filter(t => t.FolderId === props.folder!!.Id) : tasks;

    const tasksByFolderStatus = ((): Task[] => {
        if (statusFilter == null || statusFilter === "Without")
            return tasksByFolder;

        return tasksByFolder.filter(t => t.Status === parseInt(statusFilter));
    })();

    return (
        <div className="w-full min-h-full pt-2 overflow-y-scroll">
            <div className="flex justify-center pe-10 text-2xl font-medium mb-2">
                Задачи
            </div>

            <div className="flex justify-between items-center ps-6 pe-16 max-sm:pe-10 mb-4">
                <div className="text-zinc-500">
                    Количество: <b>{tasksByFolderStatus.length}</b>
                </div>

                <div>
                    <Select onValueChange={s => setStatusFilter(s)}>
                        <SelectTrigger className="w-32 bg-zinc-300 border-zinc-300">
                            <SelectValue placeholder="Статус" className="text-zinc-500" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Without">
                                <span className="text-zinc-500">Без фильтра</span>
                            </SelectItem>
                            <SelectItem value="-1">
                                <span className="text-zinc-500">Провалено</span>
                            </SelectItem>
                            <SelectItem value="0">
                                <span className="text-zinc-500">В процессе</span>
                            </SelectItem>
                            <SelectItem value="1">
                                <span className="text-zinc-500">Выполнено</span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap max-sm:justify-between px-4">
                {
                    tasksByFolderStatus.map(
                        t => <TaskItem task={t} key={t.Id} clickCallBack={props.taskCallBack} />
                    )
                }
            </div>
        </div>
    );
};

export default TasksListBody;