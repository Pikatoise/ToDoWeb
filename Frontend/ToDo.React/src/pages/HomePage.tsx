import { FC, useState, useEffect } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import TaskItem from "@/components/Items/TaskItem";

const HomePage: FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [folder, setFolder] = useState<Folder | null>(null);
    const [tasks, setTasks] = useState<Task[]>([
        { Id: 0, Name: "Task 1", FolderId: 1 },
        { Id: 1, Name: "Task 2", FolderId: 1 },
        { Id: 2, Name: "Task 3", FolderId: 1 },
        { Id: 3, Name: "Task 4", FolderId: 2 },
        { Id: 4, Name: "Task 5", FolderId: 2 },
        { Id: 5, Name: "Task 6", FolderId: 2 },
        { Id: 6, Name: "Task 7", FolderId: 3 },
        { Id: 7, Name: "Task 8", FolderId: 3 },
        { Id: 8, Name: "Task 9", FolderId: 3 },
        { Id: 9, Name: "Task 10", FolderId: 3 },
    ]);

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

            <div className="w-full min-h-full pt-2 max-sm:pt-10">
                <div className="flex flex-wrap">
                    {
                        tasksByFolder.map(t => <TaskItem task={t} key={t.Id} />)
                    }
                </div>
            </div>
        </Container>
    );
};

export default HomePage;