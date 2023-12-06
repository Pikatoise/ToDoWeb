import { FC, useState, useEffect, useMemo } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";
import Folder from "@/models/Folder";
import Task from "@/models/Task";
import TasksList from "@/components/List/TasksList";
import TaskForm from "@/components/Form/TaskForm";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";
import { GetApiStatus } from "@/api/API";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const HomePage: FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [width, setWidth] = useState(window.innerWidth);
    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
    const [task, setTask] = useState<Task | null>(null);
    const [isAddingTask, setIsAddingTask] = useState<Boolean>(false);
    const UpdateTasksEvent = useState<boolean>(false);
    const UpdateFoldersEvent = useState<boolean>(false);

    useEffect(() => {
        GetApiStatus().then(status => {
            if (!status)
                auth?.signOut(() => navigate("/login", { replace: true }));
        });

        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    useEffect(() => {
        setTask(null);
        setIsAddingTask(false);
    }, [UpdateFoldersEvent[0]]);

    const separator = width > 640 ?
        <Separator orientation={Orientation.Vertical} margin={Margin.Small} />
        :
        <></>;

    const FolderCallBack = (newFolder: Folder | null) => setSelectedFolder(newFolder);

    return (
        <Container padding={Padding.Small}>
            <BurgerMenu>
                <SidePanel
                    folderChange={FolderCallBack}
                    UpdateTasksEvent={UpdateTasksEvent}
                    UpdateFoldersEvent={UpdateFoldersEvent}
                />
            </BurgerMenu>

            {separator}

            {
                task == null ?
                    isAddingTask ?
                        <TaskForm
                            task={null}
                            ExitCallBack={() => setIsAddingTask(false)} />
                        :
                        <TasksList
                            updateTasks={UpdateTasksEvent[0]}
                            selectedFolder={selectedFolder}
                            ChangeTaskCallBack={setTask}
                            AddTaskCallBack={() => setIsAddingTask(true)} />
                    :
                    <TaskForm
                        task={task}
                        ExitCallBack={() => setTask(null)} />
            }
        </Container>
    );
};

export default HomePage;