import Task from "@/models/Task";
import { FC, useState, useEffect } from 'react';
import styles from "@/styles/TaskItem.module.css";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { parseISO, toDate } from "date-fns";

interface TaskItemProps {
    task: Task;
    clickCallBack: (task: Task) => void;
    changeSelectedTasks: (task: Task, isAdd: Boolean) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, clickCallBack, changeSelectedTasks, ...props }) => {
    const NAMEMAXSIZE = 8;
    const DESCMAXSIZE = 20;
    const DESCLINEMAXSIZE = 12;

    const [isCanSelect, setIsCanSelect] = useState<Boolean>(false);
    const [isSelected, setIsSelected] = useState<CheckedState>(false);

    const taskStatusColor = [styles.statusFailed, styles.statusInProgress, styles.statusDone].at(task.Status! + 1);
    const showSelectAlways = isCanSelect || isSelected;

    const croppedName = (): string => {
        var result = task.Name;

        if (result!.length > NAMEMAXSIZE)
            result = result?.slice(0, NAMEMAXSIZE) + "...";

        return result as string;
    };


    const croppedDescription = (): string => {
        var result: string = "";

        if (task.Description == null)
            return result;

        result = task.Description;

        if (task.Description.length > DESCMAXSIZE)
            result = result.slice(0, DESCMAXSIZE) + "...";

        if (result.length > DESCLINEMAXSIZE)
            for (let i = 0; i < result.length; i += DESCLINEMAXSIZE)
                if (result.length < i + DESCLINEMAXSIZE)
                    break;
                else
                    result = result.substring(0, i + DESCLINEMAXSIZE) + "\n" + result.substring(i + DESCLINEMAXSIZE, result.length);

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
                <span className={styles.name}>
                    {croppedName()}
                </span>

                <Checkbox
                    checked={isSelected}
                    className={[styles.checkbox, showSelectAlways ? styles.visible : ""].join(' ')} />
            </div>

            <div onClick={() => clickCallBack(task)}>
                <div className={styles.description}>
                    {croppedDescription()}
                </div>

                <div className={styles.footer}>
                    {parseISO(task.ExpiryDate?.toString()!).toLocaleDateString()}

                    <div className={[styles.status, taskStatusColor].join(' ')} />
                </div>

            </div>

        </div>
    );
};

export default TaskItem;