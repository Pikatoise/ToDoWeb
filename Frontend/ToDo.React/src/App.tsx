import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";
import RequireAuth from "@/hoc/RequireAuth";
import AuthProvider from "@/hoc/AuthProvider";
import ProfilePage from "@/pages/ProfilePage";

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/login" element={<AuthPage />} />

                        <Route index element={
                            <RequireAuth >
                                <HomePage />
                            </RequireAuth>
                        } />

                        <Route path="/profile" element={
                            <RequireAuth>
                                <ProfilePage />
                            </RequireAuth>
                        } />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
