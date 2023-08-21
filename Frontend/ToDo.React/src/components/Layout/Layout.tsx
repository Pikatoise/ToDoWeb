import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import styles from '@/styles/Layout.module.css';

export const Layout = () => {
    return (
        <main>
            <Header />

            <div className={styles.layoutBody}>
                <Outlet />
            </div>
        </main>
    );
};