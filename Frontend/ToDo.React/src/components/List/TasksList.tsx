import { FC, useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskItem from "@/components/Items/TaskItem";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import { GetTasksByProfileId } from "@/api/TaskApi";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/TaskList.module.css";
import LoadingCircle, { LoadingCircleSize } from "@/components/Loading/LoadingCircle";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TasksListBodyProps {
    selectedFolder: Folder | null,
    ChangeTaskCallBack: (task: Task) => void;
    AddTaskCallBack: () => void;
    updateTasks: boolean;
}

const TasksListBody: FC<TasksListBodyProps> = ({ ...props }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const auth = useAuth();

    const UpdateTasks = () => {
        setSelectedTasks([]);
        setTasks([]);
        setIsLoaded(false);

        GetTasksByProfileId(
            auth?.user?.ProfileId!,
            (tasks: Task[]) => {
                setTasks(tasks);
                setIsLoaded(true);
            });
    };

    useMemo(() => {
        UpdateTasks();
    }, []);

    useMemo(() => {
        UpdateTasks();

        console.log("Update tasks");
    }, [props.updateTasks]);

    const tasksByFolder = props.selectedFolder != null ? tasks.filter(t => t.FolderId === props.selectedFolder!!.Id) : tasks;

    const tasksByFolderStatus = ((): Task[] => {
        if (statusFilter == null || statusFilter === "Without")
            return tasksByFolder;

        return tasksByFolder.filter(t => t.Status === parseInt(statusFilter));
    })();

    const ChangeSelectedTasks = (task: Task, isAdd: Boolean) => {
        if (isAdd)
            setSelectedTasks(v => [task, ...v]);
        else
            setSelectedTasks(v => v.filter(t => t.Id != task.Id));
    };

    const DeleteSelectedTasks = () => {
        // Api Удалить все выбранные таски

        UpdateTasks();
    };

    return (
        <div className={styles.list}>
            <div className={styles.title}>
                Задачи
            </div>

            <div className={styles.info}>
                <div className={styles.text}>
                    Количество: <b>{tasksByFolderStatus.length}</b>
                </div>

                <Button
                    className={[styles.deleteTasks, selectedTasks.length > 0 ? styles.visible : ''].join(' ')}
                    onClick={DeleteSelectedTasks}>
                    <Trash />
                    Удалить {`(${selectedTasks.length})`}
                </Button>

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
                    isLoaded ?
                        <>
                            <div className={styles.card} onClick={() => props.AddTaskCallBack()}>
                                <Plus className={styles.icon} />
                                Добавить задачу
                            </div>

                            {
                                tasksByFolderStatus.map(
                                    t => <TaskItem
                                        task={t}
                                        key={t.Id}
                                        clickCallBack={props.ChangeTaskCallBack}
                                        changeSelectedTasks={ChangeSelectedTasks} />)
                            }
                        </>
                        :
                        <LoadingCircle size={LoadingCircleSize.Large} />
                }
            </div>
        </div>
    );
};

export default TasksListBody;