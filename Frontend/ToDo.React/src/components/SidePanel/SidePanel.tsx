import { FC, useState } from 'react';
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";
import { Button } from "@/components/ui/button";
import { LogOut, UserSquare2, Plus, Trash } from "lucide-react";
import Separator, { Orientation } from "@/components/Separator/Separator";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/SidePanel.module.css";
import { useNavigate } from "react-router-dom";
import Folder from "@/models/Folder";
import FolderItem from "@/components/Items/FolderItem";
import AlertDialog from "@/components/Dialog/AlertDialog";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface SidePanelProps {
    folderChange: (folder: Folder | null) => void;
}

const SidePanel: FC<SidePanelProps> = ({ ...props }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [folders, setFolders] = useState<Folder[]>([
        { Id: 1, Name: "Работа", ProfileId: 1 },
        { Id: 2, Name: "Дом", ProfileId: 1 },
        { Id: 3, Name: "Хобби", ProfileId: 1 }
    ]);

    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const ExitClick = () => {
        auth?.signOut(() => {
            navigate('/login', { replace: true });
        });
    };

    const ProfileClick = () => {

    };

    const AddFolderClick = () => {

    };

    const DeleteFolder = () => {
        setFolders(current => current.filter(f => f.Id != selectedFolder?.Id));
        setSelectedFolder(null);

        setDeleteDialogOpen(false);
    };

    const DeleteFolderCascade = () => {
        // УДалить все таски связанные с папкой

        DeleteFolder();
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

    return (
        <BurgerMenu>
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
                            onClick={AddFolderClick}>
                            Создать папку
                        </Button>

                        {
                            selectedFolder == null ?
                                <></>
                                :
                                <Button
                                    size="icon"
                                    className={styles.btnDeleteFolder}
                                    onClick={() => setDeleteDialogOpen(true)}>
                                    <Trash
                                        color="#000"
                                        strokeWidth={2}
                                        className={styles.icon} />
                                </Button>
                        }
                    </div>

                    <div>
                        {
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

                    <AlertDialogAction onClick={DeleteFolderCascade}>
                        Папку и задачи
                    </AlertDialogAction>
                </>
            </AlertDialog>
        </BurgerMenu>
    );
};

export default SidePanel;