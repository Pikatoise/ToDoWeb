import { FC, useState, useEffect, useMemo } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import TaskItem from "@/components/Items/TaskItem";

const HomePage: FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [folder, setFolder] = useState<Folder | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    useMemo(() => {
        setTasks([]);

        for (let i = 0; i < 50; i++) {
            let task: Task =
            {
                Id: i,
                Name: `Task ${i + 1}`,
                FolderId: Math.floor(Math.random() * (4 - 1) + 1),
                Description: `Description of task dwdw fre wdwd${i + 1}`,
                ExpiryDate: new Date("2023-11-13")
            };
            setTasks(t => [...t, task]);

            //console.log(task);
        }
    }, []);

    const tasksByFolder = folder != null ? tasks.filter(t => t.FolderId === folder.Id) : tasks;

    const separator = width > 640 ?
        <Separator orientation={Orientation.Vertical} margin={Margin.Small} />
        :
        <></>;

    const FolderCallBack = (newFolder: Folder | null) => setFolder(newFolder);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return (
        <Container padding={Padding.Small}>
            <SidePanel folderChange={FolderCallBack} />

            {separator}

            <div className="w-full min-h-full max-sm:pt-2 overflow-y-scroll">
                <div className="flex justify-center pe-10 text-2xl font-medium">
                    Задачи
                </div>

                <div className="flex flex-wrap max-sm:justify-between px-4">
                    {
                        tasksByFolder.map(t => <TaskItem task={t} key={t.Id} />)
                    }
                </div>
            </div>
        </Container>
    );
};

export default HomePage;