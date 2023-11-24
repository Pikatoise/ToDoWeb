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
    const TEXTMAXSIZE = 20;
    const TEXTLINEMAXSIZE = 12;

    const croppedText = (): string => {
        var result: string = "";

        if (task.Description == null)
            return result;

        result = task.Description;

        if (task.Description.length > TEXTMAXSIZE)
            result = result.slice(0, TEXTMAXSIZE) + "...";

        if (result.length > TEXTLINEMAXSIZE)
            for (let i = 0; i < result.length; i += TEXTLINEMAXSIZE)
                if (result.length < i + TEXTLINEMAXSIZE)
                    break;
                else
                    result = result.substring(0, i + TEXTLINEMAXSIZE) + "\n" + result.substring(i + TEXTLINEMAXSIZE, result.length);

        return result;
    };

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
                    {croppedText()}
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