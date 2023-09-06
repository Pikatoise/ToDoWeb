import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import styles from '@/styles/Layout.module.css';
import { Footer } from "@/components/Footer/Footer";
import { FC } from 'react';

export const Layout: FC = () => {
    return (
        <main>
            <Header />

            <div className={styles.layoutBody}>
                <Outlet />
            </div>

            <Footer />
        </main>
    );
};