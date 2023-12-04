import Task from "@/models/Task";
import { FC, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Pencil, ArrowLeft, Trash, Check } from "lucide-react";
import styles from "@/styles/TaskForm.module.css";
import { useTaskForm } from "@/hooks/useTaskForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from 'react-hook-form';
import Folder from "@/models/Folder";
import { Label } from "@/components/ui/label";
import { ru } from "date-fns/locale";
import { GetFoldersByProfileId } from "@/api/FolderApi";
import useAuth from "@/hooks/useAuth";

interface TaskBodyProps {
    task: Task | null;
    ExitCallBack: () => void;
}

const TaskBody: FC<TaskBodyProps> = ({ task, ExitCallBack }) => {
    const {
        registerName,
        registerDescription,
        registerExpiryDate,
        registerFolderId,
        registerStatus,
        onSubmitUpdate,
        onSubmitAdd,
        errors,
        control
    } = useTaskForm(task);

    const auth = useAuth();

    const [folders, setFolders] = useState<Folder[]>([{ Id: -1, Name: "Отсутствует", ProfileId: -1 }, ...GetFoldersByProfileId(auth?.user?.ProfileId!)]);

    const isAddOrUpdate = task == null;

    const DeleteTask = () => {
        // Delete task through api call
    };

    return (
        <form
            className={styles.form}
            onSubmit={isAddOrUpdate ? onSubmitAdd : onSubmitUpdate}>

            <div className={styles.title}>
                {
                    isAddOrUpdate ?
                        "Добавить"
                        :
                        "Редактировать"
                }
            </div>

            <div>
                <Label htmlFor="Name" className={styles.label}>Название *</Label>
                <Input
                    id="Name"
                    minLength={2}
                    maxLength={15}
                    className={styles.inputText}
                    {...registerName}
                    placeholder="Название" />
            </div>


            {/* <div className={styles.errorText}>
                {errors?.name && <p>{errors.name.message}</p>}
            </div> */}

            <div>
                <Label htmlFor="Description" className={styles.label}>Описание</Label>
                <Input
                    id="Description"
                    maxLength={150}
                    className={styles.inputText}
                    {...registerDescription}
                    placeholder="Описание" />
            </div>

            <div className={styles.secondHalf}>
                <div className={styles.mobile}>
                    <div>
                        <Label htmlFor="StatusSelect" className={styles.label}>Статус</Label>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) =>
                                <Select name="StatusSelect" onValueChange={field.onChange} value={field.value.toString()}>
                                    <SelectTrigger className={styles.selectTrigger}>
                                        <SelectValue placeholder="Статус" className={styles.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
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
                            } />
                    </div>

                    <div>
                        <Label htmlFor="FolderSelect" className={styles.label}>Папка</Label>
                        <Controller
                            control={control}
                            name="folderId"
                            render={({ field }) =>
                                <Select name="FolderSelect" onValueChange={field.onChange} value={field.value!.toString()}>
                                    <SelectTrigger className={styles.selectTrigger}>
                                        <SelectValue placeholder="Папка" className={styles.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            folders.map(f =>
                                                <SelectItem value={f.Id!.toString()} key={f.Id}>
                                                    <span className={styles.text}>{f.Name}</span>
                                                </SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            } />
                    </div>
                </div>

                <div className={styles.calendarContainer}>
                    <Label htmlFor="ExpiryDate" className={styles.label}>Срок *</Label>
                    <Controller
                        control={control}
                        name="expiryDate"
                        render={({ field }) =>
                            <Calendar
                                id="ExpiryDate"
                                mode="single"
                                locale={ru}
                                today={undefined}
                                onSelect={field.onChange}
                                selected={field.value!} />
                        } />
                </div>
            </div>

            <div className={styles.actions}>
                <Button className={styles.actionButton} onClick={exitCallBack}>
                    <ArrowLeft width={30} height={30} />
                    <span className={styles.actionText}>Назад</span>
                </Button>

                {
                    isAddOrUpdate ?
                        <></>
                        :
                        <Button className={[styles.actionButton, styles.delete].join(' ')} onClick={DeleteTask}>
                            <Trash width={30} height={30} />
                            <span className={styles.actionText}>Удалить</span>
                        </Button>

                }

                <Button className={[styles.actionButton, styles.submit].join(' ')} type="submit">
                    <Check width={30} height={30} />
                    <span className={styles.actionText}>Сохранить</span>
                </Button>
            </div>
        </form>
    );
};

export default TaskBody;