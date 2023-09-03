import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import styles from '@/styles/Layout.module.css';
import { Footer } from "@/components/Footer/Footer";

export const Layout = () => {
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