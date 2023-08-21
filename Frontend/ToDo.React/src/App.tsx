import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route index element={<HomePage />} /> */}
                    <Route index element={<AuthPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
