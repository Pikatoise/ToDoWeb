import { FC, PropsWithChildren, useState, useEffect } from 'react';
import styles from '@/styles/BurgerMenu.module.css';
import { Menu, X } from 'lucide-react';

const BurgerMenu: FC<PropsWithChildren> = ({ children }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    const MenuClick = () => {
        setMenuOpen(current => !current);
    };

    return (
        <div className={[styles.burger, isMenuOpen ? styles.open : styles.hide].join(" ")}>
            <div className={styles.content}>
                {children}
            </div>

            {
                width > 640 ?
                    <></>
                    :
                    isMenuOpen ?
                        <X color="#000" className={styles.btnMenu} onClick={MenuClick} />
                        :
                        <Menu color="#000" className={styles.btnMenu} onClick={MenuClick} />
            }
        </div>
    );
};

export default BurgerMenu;