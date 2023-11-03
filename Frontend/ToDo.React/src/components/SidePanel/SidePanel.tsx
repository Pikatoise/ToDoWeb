import { FC } from 'react';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
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

    return (
        <BurgerMenu>
            <div className={styles.sidePanel}>
                <div className={styles.head}>
                    <div className={styles.login}>
                        {auth?.user?.Login}
                    </div>

                    <Button size="icon" className={styles.btnExit} onClick={ExitClick}>
                        <LogOut color="#000" strokeWidth={3} className={styles.icon} />
                    </Button>
                </div>

                <Separator orientation={Orientation.Horizontal} margin={2} />
            </div>
        </BurgerMenu>
    );
};

export default SidePanel;