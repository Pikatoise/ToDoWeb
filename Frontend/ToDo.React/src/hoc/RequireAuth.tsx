import { useLocation, Navigate } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import { useAuth } from "@/hooks/useAuth";

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth?.user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};