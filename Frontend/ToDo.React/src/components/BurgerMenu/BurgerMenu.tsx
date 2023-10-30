import React, { FC, PropsWithChildren } from 'react';
import styles from '@/styles/BurgerMenu.module.css';

const BurgerMenu: FC<PropsWithChildren> = ({children,...props}) => {
    return (
        <div className={styles.mainContainer}>
            <div>
                {children}
            </div>
        </div>
    );
};

export default BurgerMenu;