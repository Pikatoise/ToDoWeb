import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { NotFound } from "@/pages/NotFound";
import { RequireAuth } from "@/hoc/RequireAuth";
import { AuthProvider } from "@/hoc/AuthProvider";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={
                            <RequireAuth >
                                <HomePage />
                            </RequireAuth>
                        } />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
