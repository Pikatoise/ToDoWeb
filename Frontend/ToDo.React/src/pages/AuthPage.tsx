import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/Form/LoginForm';
import { RegisterForm } from "@/components/Form/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
    const [isSignIn, setSign] = useState(true);

    const navigate = useNavigate();

    const auth = useAuth();

    const isAuthorized = auth?.user != null;

    const changeSign = () => setSign(currentSign => !currentSign);

    const signForm = () => {
        if (isSignIn)
            return <LoginForm changeSign={changeSign} />;
        else
            return <RegisterForm changeSign={changeSign} />;
    };

    useEffect(() => {
        if (isAuthorized)
            navigate('/', { replace: true });
    });

    return (
        <>
            {
                isAuthorized ? <></> : signForm()
            }
        </>
    );
};