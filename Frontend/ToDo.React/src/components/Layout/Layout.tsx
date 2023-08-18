import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';

export const Layout = () => {
    return (
        <main>
            <Header />

            <div className="bg-zinc-300">
                <Outlet />
            </div>
        </main>
    );
};