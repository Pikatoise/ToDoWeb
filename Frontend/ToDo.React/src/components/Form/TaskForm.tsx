import { ArrowLeft, Trash, Check } from "lucide-react";
import { FC, useState, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { ru } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetFoldersByProfileId } from "@/api/FolderApi";
import { Calendar } from "@/components/ui/calendar";
import styles from "@/styles/TaskForm.module.css";
import { useTaskForm } from "@/hooks/useTaskForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import { RemoveTaskById } from "@/api/TaskApi";

interface TaskBodyProps {
    task: Task | null;
    ExitCallBack: () => void;
}

const TaskBody: FC<TaskBodyProps> = ({ task, ExitCallBack }) => {
    const auth = useAuth();
    const {
        registerName,
        registerDescription,
        registerExpiryDate,
        registerFolderId,
        onSubmitUpdate,
        onSubmitAdd,
        errors,
        control
    } = useTaskForm(task, ExitCallBack);
    const [folders, setFolders] = useState<Folder[]>([]);

    const UpdateFolders = () => {
        setFolders([]);

        GetFoldersByProfileId(
            auth?.user?.ProfileId!,
            (folders: Folder[]) => {
                setFolders([{ Id: -1, Name: "Отсутствует", ProfileId: -1 }, ...folders]);
            });
    };

    useMemo(() => {
        UpdateFolders();
    }, []);


    const isAddOrUpdate = task == null;

    const DeleteTask = () => {
        RemoveTaskById(task?.Id!, (status: number) => {
            ExitCallBack();
        });
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
                    {
                        isAddOrUpdate ?
                            <></>
                            :
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
                    }

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
                <Button className={styles.actionButton} onClick={ExitCallBack}>
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