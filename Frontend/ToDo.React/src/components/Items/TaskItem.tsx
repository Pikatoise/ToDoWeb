import Task from "@/models/Task";
import { FC, useState, useEffect } from 'react';
import styles from "@/styles/TaskItem.module.css";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface TaskItemProps {
    task: Task;
    clickCallBack: (task: Task) => void;
    changeSelectedTasks: (task: Task, isAdd: Boolean) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, clickCallBack, changeSelectedTasks, ...props }) => {
    const [isCanSelect, setIsCanSelect] = useState<Boolean>(false);
    const [isSelected, setIsSelected] = useState<CheckedState>(false);
    const taskStatusColor = [styles.statusFailed, styles.statusInProgress, styles.statusDone].at(task.Status! + 1);
    const showSelectAlways = isCanSelect || isSelected;

    useEffect(() => {
        changeSelectedTasks(task, isSelected == true ? true : false);
    }, [isSelected]);

    return (
        <div
            className={styles.card}
            onMouseEnter={() => setIsCanSelect(true)}
            onMouseLeave={() => setIsCanSelect(false)}>
            <div className={styles.title} onClick={() => setIsSelected(v => !v)}>
                <span className={styles.name}>{task.Name}</span>

                <Checkbox checked={isSelected} className={[styles.checkbox, showSelectAlways ? styles.visible : ""].join(' ')} />
            </div>

            <div onClick={() => clickCallBack(task)}>
                <div className={styles.description}>
                    {
                        task.Description?.length!! > 30 ?
                            `${task.Description?.slice(0, 25)}...`
                            :
                            task.Description
                    }
                </div>

                <div className={styles.footer}>
                    {task.ExpiryDate?.toLocaleDateString()}

                    <div className={[styles.status, taskStatusColor].join(' ')} />
                </div>

            </div>

        </div>
    );
};

export default TaskItem;