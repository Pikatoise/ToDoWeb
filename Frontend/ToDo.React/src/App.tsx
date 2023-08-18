import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route index element={<HomePage />} /> */}
                    <Route index element={<LoginPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
