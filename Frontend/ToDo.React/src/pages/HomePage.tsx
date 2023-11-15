import { FC, useState, useEffect, useMemo } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import TaskItem from "@/components/Items/TaskItem";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import TasksListBody from "@/components/Body/TasksListBody";
import TaskBody from "@/components/Body/TaskBody";

const HomePage: FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [folder, setFolder] = useState<Folder | null>(null);
    const [task, setTask] = useState<Task | null>(null);

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

            {
                task == null ?
                    <TasksListBody folder={folder} setTask={setTask} />

                    :
                    <TaskBody task={task} exitCallBack={() => setTask(null)} />
            }
        </Container>
    );
};

export default HomePage;