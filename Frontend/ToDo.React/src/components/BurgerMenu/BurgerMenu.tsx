import { FC, PropsWithChildren } from 'react';
import styles from '@/styles/BurgerMenu.module.css';

const BurgerMenu: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.burger}>
            {children}
        </div>
    );
};

export default BurgerMenu;