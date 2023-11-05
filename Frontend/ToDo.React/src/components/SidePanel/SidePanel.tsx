import { FC, useState } from 'react';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Button } from "../ui/button";
import { LogOut, UserSquare2, Plus, Trash } from "lucide-react";
import Separator, { Orientation } from "../Separator/Separator";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/SidePanel.module.css";
import { useNavigate } from "react-router-dom";
import Folder from "@/models/Folder";
import FolderItem from "../Items/FolderItem";

const SidePanel: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [folders, setFolders] = useState<Folder[]>([
        { Id: 1, Name: "Работа", ProfileId: 1 },
        { Id: 2, Name: "Дом", ProfileId: 1 },
        { Id: 3, Name: "Хобби", ProfileId: 1 }
    ]);

    const [selectedFolder, setSelectedFolder] = useState<Folder | null>(folders[0]);

    const ExitClick = () => {
        auth?.signOut(() => {
            navigate('/login', { replace: true });
        });
    };

    const ProfileClick = () => {

    };

    const AddFolderClick = () => {

    };

    const DeleteFolderClick = () => {

    };

    return (
        <BurgerMenu>
            <div className={styles.sidePanel}>
                <div className={styles.head}>
                    <div className={styles.user} onClick={ProfileClick}>
                        <UserSquare2 color="#000" strokeWidth={2} className={styles.icon} />

                        <div className={styles.login}>
                            {auth?.user?.Login}
                        </div>
                    </div>

                    <Button size="icon" className={styles.btnExit} onClick={ExitClick}>
                        <LogOut color="#000" strokeWidth={2} className={styles.icon} />
                        Выйти
                    </Button>
                </div>

                <Separator orientation={Orientation.Horizontal} />

                <div className={styles.folders}>
                    <div className="flex mb-2">
                        <Button className={styles.btnAddFolder} onClick={AddFolderClick}>
                            Создать папку
                        </Button>

                        {
                            selectedFolder == null ?
                                <></>
                                :
                                <Button size="icon" className={styles.btnDeleteFolder} onClick={DeleteFolderClick}>
                                    <Trash color="#000" strokeWidth={2} className={styles.icon} />
                                </Button>
                        }
                    </div>

                    <div>
                        {
                            folders.length == 0 ?
                                <div className={styles.noFolders}>Пусто</div>
                                :
                                folders.map(f => <FolderItem folder={f} key={f.Id} />)
                        }
                    </div>
                </div>
            </div>
        </BurgerMenu>
    );
};

export default SidePanel;