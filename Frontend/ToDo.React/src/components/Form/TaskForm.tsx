import Task from "@/models/Task";
import { FC, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Pencil, ArrowLeft } from "lucide-react";
import styles from "@/styles/TaskForm.module.css";
import { useUpdateTaskForm } from "@/hooks/useTaskForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from 'react-hook-form';
import Folder from "@/models/Folder";

interface TaskBodyProps {
    task: Task;
    exitCallBack: () => void;
}

const TaskBody: FC<TaskBodyProps> = ({ task, exitCallBack }) => {
    const {
        registerName,
        registerDescription,
        registerExpiryDate,
        registerFolderId,
        registerStatus,
        onSubmit,
        errors,
        control
    } = useUpdateTaskForm(task);

    const [folders, setFolders] = useState<Folder[]>([
        { Id: 1, Name: "Работа", ProfileId: 1 },
        { Id: 2, Name: "Дом", ProfileId: 1 },
        { Id: 3, Name: "Хобби", ProfileId: 1 }
    ]);

    return (
        <div className="w-full min-h-full pt-2">
            <div className="flex justify-center items-center mb-2 text-2xl font-medium pe-10">
                <div className="flex cursor-pointer" onClick={exitCallBack}>
                    <ArrowLeft width={30} height={30} />
                    Назад
                </div>
            </div>

            <form
                className={styles.form}
                onSubmit={onSubmit}>
                <Input
                    {...registerName}
                    placeholder="Название" />

                {/* <div className={styles.errorText}>
                    {errors?.name && <p>{errors.name.message}</p>}
                </div> */}

                <Input
                    {...registerDescription}
                    placeholder="Описание" />

                <Controller
                    control={control}
                    name="expiryDate"
                    render={({ field }) =>
                        <Calendar
                            mode="single"
                            onSelect={field.onChange}
                            selected={field.value!} />
                    } />

                <Controller
                    control={control}
                    name="status"
                    render={({ field }) =>
                        <Select onValueChange={field.onChange} value={field.value.toString()}>
                            <SelectTrigger className="w-32 bg-zinc-300 border-zinc-300">
                                <SelectValue placeholder="Статус" className="text-zinc-500" />
                            </SelectTrigger>
                            <SelectContent>
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
                    } />

                <Controller
                    control={control}
                    name="folderId"
                    render={({ field }) =>
                        <Select onValueChange={field.onChange} value={field.value!.toString()}>
                            <SelectTrigger className="w-32 bg-zinc-300 border-zinc-300">
                                <SelectValue placeholder="Папка" className="text-zinc-500" />
                            </SelectTrigger>
                            <SelectContent>
                                {folders.map(f =>
                                    <SelectItem value={f.Id!.toString()} key={f.Id}>
                                        <span className="text-zinc-500">{f.Name}</span>
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    } />

                <Button
                    type="submit">
                    Сохранить
                </Button>
            </form>
        </div>
    );
};

export default TaskBody;