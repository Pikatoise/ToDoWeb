import { FC } from 'react';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Button } from "../ui/button";
import { LogOut, UserSquare2 } from "lucide-react";
import Separator, { Orientation } from "../Separator/Separator";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/SidePanel.module.css";
import { useNavigate } from "react-router-dom";

const SidePanel: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const ExitClick = () => {
        auth?.signOut(() => {
            navigate('/login', { replace: true });
        });
    };

    const ProfileClick = () => {

    };

    return (
        <BurgerMenu>
            <div className={styles.sidePanel}>
                <div className={styles.head}>
                    <div className={styles.user}>
                        <Button size="icon" className={styles.btnProfile} onClick={ProfileClick}>
                            <UserSquare2 color="#000" strokeWidth={2} className={styles.icon} />
                        </Button>

                        <div className={styles.login}>
                            {auth?.user?.Login}
                        </div>
                    </div>

                    <Button size="icon" className={styles.btnExit} onClick={ExitClick}>
                        <LogOut color="#000" strokeWidth={2} className={styles.icon} />
                        Выйти
                    </Button>
                </div>

                <Separator orientation={Orientation.Horizontal} stroke="2" />

                <div className={styles.folders}>
                    <div>
                        Folder 1
                    </div>
                </div>
            </div>
        </BurgerMenu>
    );
};

export default SidePanel;