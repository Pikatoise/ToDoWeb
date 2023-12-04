import { LogOut, UserSquare2, Trash, Pencil } from "lucide-react";
import { FC, useState, useMemo, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoadingCircle, { LoadingCircleSize } from "@/components/Loading/LoadingCircle";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import Separator, { Orientation } from "@/components/Separator/Separator";
import AlertDialog from "@/components/Dialog/AlertDialog";
import { AddFolderToProfile, ChangeFolderName, GetFoldersByProfileId, RemoveFolderById } from "@/api/FolderApi";
import FolderItem from "@/components/Items/FolderItem";
import styles from "@/styles/SidePanel.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import Folder from "@/models/Folder";
import { useToast } from "@/components/ui/use-toast";
import { RemoveTasksByFolderId } from "@/api/TaskApi";

interface SidePanelProps {
    folderChange: (folder: Folder | null) => void;
    UpdateTasks: (v: boolean) => void;
    updateTasks: boolean;
}

const SidePanel: FC<SidePanelProps> = ({ ...props }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [folders, setFolders] = useState<Folder[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [folderName, setFolderName] = useState<string>("");

    const UpdateFolders = () => {
        setFolders([]);
        setIsLoaded(false);
        setSelectedFolder(null);
        props.folderChange(null);

        GetFoldersByProfileId(
            auth?.user?.ProfileId!,
            (folders: Folder[]) => {
                setFolders(folders);
                setIsLoaded(true);
            });
    };

    useMemo(() => {
        UpdateFolders();
    }, []);

    const ExitClick = () => {
        auth?.signOut(() => {
            navigate('/login', { replace: true });
        });
    };

    const ProfileClick = () => {
        navigate('/profile', { replace: true });
    };

    const AddFolder = () => {
        if (folderName.length > 0) {
            setAddDialogOpen(false);

            AddFolderToProfile(auth?.user?.ProfileId!, folderName, (status) => {
                switch (status) {
                    case 200:
                        toast({ title: "Успешно", description: "Папка создана" });
                        break;
                    default:
                        toast({ title: "Ошибка", description: "Не удалось создать папку" });
                        break;
                }

                UpdateFolders();
            });

            setFolderName("");
        }
        else
            (document.getElementById("inputNewName") as HTMLInputElement).focus();
    };

    const SelectFolderCallBack = (folder: Folder) => {
        if (folder.Id == selectedFolder?.Id) {
            setSelectedFolder(null);
            props.folderChange(null);
        }
        else {
            setSelectedFolder(folder);
            props.folderChange(folder);
        }
    };

    const DeleteFolder = () => {
        RemoveFolderById(selectedFolder?.Id!, (status: number) => {
            switch (status) {
                case 200:
                    toast({ title: "Успешно", description: "Папка удалена" });
                    break;
                default:
                    toast({ title: "Ошибка", description: "Не удалось удалить папку" });
                    break;
            }

            UpdateFolders();
        });

        setDeleteDialogOpen(false);
    };

    const DeleteFolderCascade = () => {
        RemoveTasksByFolderId(selectedFolder?.Id!, (removedCount: number) => {
            console.log(`Remove ${removedCount} tasks`);

            props.UpdateTasks(!props.updateTasks);

            DeleteFolder();
        });
    };

    const EditFolder = () => {
        if (folderName.length > 0) {
            ChangeFolderName(selectedFolder?.Id!, folderName, (status: number) => {
                switch (status) {
                    case 200:
                        toast({ title: "Успешно", description: "Название папки изменено" });
                        break;
                    default:
                        toast({ title: "Ошибка", description: "Не удалось изменить название" });
                        break;
                }

                UpdateFolders();
            });

            setEditDialogOpen(false);
            setFolderName("");
        }
        else
            (document.getElementById("inputEditName") as HTMLInputElement).focus();
    };

    return (
        <>
            <div className={styles.sidePanel}>
                <div className={styles.head}>
                    <div className={styles.user} onClick={ProfileClick}>
                        <UserSquare2
                            color="#000"
                            strokeWidth={2}
                            className={styles.icon} />

                        <div className={styles.login}>
                            {auth?.user?.Login}
                        </div>
                    </div>

                    <Button
                        size="icon"
                        className={styles.btnExit}
                        onClick={ExitClick}>
                        <LogOut
                            color="#000"
                            strokeWidth={2}
                            className={styles.icon} />
                        Выйти
                    </Button>
                </div>

                <Separator orientation={Orientation.Horizontal} />

                <div className={styles.folders}>
                    <div className="flex mb-2">
                        <Button
                            className={styles.btnAddFolder}
                            onClick={() => setAddDialogOpen(true)}>
                            Создать папку
                        </Button>

                        {
                            selectedFolder == null ?
                                <></>
                                :
                                <Button
                                    size="icon"
                                    className={styles.btnFolder}
                                    onClick={() => setDeleteDialogOpen(true)}>
                                    <Trash
                                        color="#000"
                                        strokeWidth={2}
                                        className={styles.icon} />
                                </Button>
                        }

                        {
                            selectedFolder == null ?
                                <></>
                                :
                                <Button
                                    size="icon"
                                    className={styles.btnFolder}
                                    onClick={() => {
                                        setFolderName(selectedFolder.Name!);
                                        setEditDialogOpen(true);
                                    }}>
                                    <Pencil
                                        width={20}
                                        height={20}
                                        color="#000"
                                        strokeWidth={2}
                                        className={styles.icon} />
                                </Button>
                        }
                    </div>

                    <div>
                        {
                            isLoaded ?
                                folders.length == 0 ?
                                    <div className={styles.noFolders}>Пусто</div>
                                    :
                                    folders.map(f =>
                                        <FolderItem
                                            folder={f}
                                            key={f.Id}
                                            onClickCallBack={SelectFolderCallBack}
                                            isSelected={selectedFolder?.Id == f.Id} />
                                    )
                                :
                                <LoadingCircle size={LoadingCircleSize.Small} />

                        }
                    </div>
                </div>
            </div>

            <AlertDialog
                isOpen={isDeleteDialogOpen}
                title="Удаление папки"
                message="Удалить связанные с папкой задачи?">
                <>
                    <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                        Отмена
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={DeleteFolder}>
                        Только папку
                    </AlertDialogAction>

                    <div className="max-sm:mb-2" />

                    <AlertDialogAction onClick={DeleteFolderCascade}>
                        Папку и задачи
                    </AlertDialogAction>
                </>
            </AlertDialog>

            <AlertDialog
                isOpen={isAddDialogOpen}
                title="Создать папку"
                message="Введите название новой папки:">
                <>
                    <AlertDialogCancel onClick={() => setAddDialogOpen(false)}>
                        Отмена
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={AddFolder}>
                        Сохранить
                    </AlertDialogAction>

                    <div className="max-sm:mb-2" />

                    <Input id="inputNewName" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
                </>
            </AlertDialog>

            <AlertDialog
                isOpen={isEditDialogOpen}
                title="Редактировать название"
                message="Введите название папки:">
                <>
                    <AlertDialogCancel onClick={() => setEditDialogOpen(false)}>
                        Отмена
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={EditFolder}>
                        Сохранить
                    </AlertDialogAction>

                    <div className="max-sm:mb-2" />

                    <Input id="inputEditName" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
                </>
            </AlertDialog>
        </>
    );
};

export default SidePanel;