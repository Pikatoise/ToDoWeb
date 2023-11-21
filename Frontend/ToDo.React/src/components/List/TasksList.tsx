import { FC, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskItem from "@/components/Items/TaskItem";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import { GetTasksByProfile, GetTasksByProfileId } from "@/api/TaskApi";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/TaskList.module.css";

interface TasksListBodyProps {
    folder: Folder | null,
    taskCallBack: (task: Task) => void;
}

const TasksListBody: FC<TasksListBodyProps> = ({ ...props }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const auth = useAuth();

    useEffect(() => {
        setTasks(t => GetTasksByProfileId(auth?.user?.ProfileId!));
    }, []);

    const tasksByFolder = props.folder != null ? tasks.filter(t => t.FolderId === props.folder!!.Id) : tasks;

    const tasksByFolderStatus = ((): Task[] => {
        if (statusFilter == null || statusFilter === "Without")
            return tasksByFolder;

        return tasksByFolder.filter(t => t.Status === parseInt(statusFilter));
    })();

    return (
        <div className={styles.list}>
            <div className={styles.title}>
                Задачи
            </div>

            <div className={styles.info}>
                <div className={styles.text}>
                    Количество: <b>{tasksByFolderStatus.length}</b>
                </div>

                <div>
                    <Select onValueChange={s => setStatusFilter(s)}>
                        <SelectTrigger className={styles.statusSelector}>
                            <SelectValue placeholder="Статус" className={styles.text} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Without">
                                <span className={styles.text}>Без фильтра</span>
                            </SelectItem>
                            <SelectItem value="-1">
                                <span className={styles.text}>Провалено</span>
                            </SelectItem>
                            <SelectItem value="0">
                                <span className={styles.text}>В процессе</span>
                            </SelectItem>
                            <SelectItem value="1">
                                <span className={styles.text}>Выполнено</span>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className={styles.items}>
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