import { FC, useState, useEffect, useMemo } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import TasksList from "@/components/List/TasksList";
import TaskForm from "@/components/Form/TaskForm";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";

const HomePage: FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [folder, setFolder] = useState<Folder | null>(null);
    const [task, setTask] = useState<Task | null>(null);
    const [isAddingTask, setIsAddingTask] = useState<Boolean>(false);

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
            <BurgerMenu>
                <SidePanel folderChange={FolderCallBack} />
            </BurgerMenu>

            {separator}

            {
                task == null ?
                    isAddingTask ?
                        <TaskForm task={null} exitCallBack={() => setIsAddingTask(false)} />
                        :
                        <TasksList folder={folder} taskCallBack={setTask} addTaskCallBack={() => setIsAddingTask(true)} />
                    :
                    <TaskForm task={task} exitCallBack={() => setTask(null)} />
            }
        </Container>
    );
};

export default HomePage;