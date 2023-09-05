import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/Form/LoginForm';
import { RegisterForm } from "@/components/Form/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { GetApiStatus } from "@/api/Api.ts";

export const AuthPage = () => {
    const [isSignIn, setSign] = useState(true);

    const navigate = useNavigate();

    const auth = useAuth();

    const isAuthorized = auth?.user != null;

    const changeSign = () => setSign(currentSign => !currentSign);

    useEffect(() => {
        GetApiStatus().then(r => {
            setInterfaceAccess(r);
        });
    }, []);

    const [interfaceAccess, setInterfaceAccess] = useState(false);

    const signForm = () => {
        if (isSignIn)
            return <LoginForm changeSign={changeSign} interfaceStatus={interfaceAccess} />;
        else
            return <RegisterForm changeSign={changeSign} interfaceStatus={interfaceAccess} />;
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