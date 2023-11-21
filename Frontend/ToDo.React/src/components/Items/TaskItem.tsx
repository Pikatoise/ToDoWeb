import Task from "@/models/Task";
import { FC } from 'react';
import styles from "@/styles/TaskItem.module.css";

interface TaskItemProps {
    task: Task;
    clickCallBack: (task: Task) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, clickCallBack, ...props }) => {
    let taskStatusColor = [styles.statusFailed, styles.statusInProgress, styles.statusDone].at(task.Status! + 1);

    return (
        <div
            className={styles.card}
            onClick={() => clickCallBack(task)}>
            <div className={styles.name}>
                {task.Name}
            </div>

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
    );
};

export default TaskItem;