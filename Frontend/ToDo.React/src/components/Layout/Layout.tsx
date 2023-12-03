import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import styles from '@/styles/Layout.module.css';
import Footer from "@/components/Footer/Footer";
import { FC } from 'react';
import { Toaster } from "@/components/ui/toaster";

const Layout: FC = () => {
    return (
        <main>
            <Header />

            <div className={styles.layoutBody}>
                <Outlet />
                <Toaster />
            </div>

            <Footer />
        </main>
    );
};

export default Layout;