import { useEffect, useState, FC } from 'react';
import LoginForm from '@/components/Form/LoginForm';
import RegisterForm from "@/components/Form/RegisterForm";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { GetApiStatus } from "@/api/API.ts";
import LoadingCircle, { LoadingCircleSize } from "@/components/Loading/LoadingCircle";

const AuthPage: FC = () => {
    const [interfaceAccess, setInterfaceAccess] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isSignIn, setSign] = useState(true);

    const navigate = useNavigate();

    const auth = useAuth();

    const isAuthorized = auth?.user != null;

    const changeSign = () => setSign(currentSign => !currentSign);

    useEffect(() => {
        GetApiStatus().then(r => {
            setInterfaceAccess(r);

            setIsLoaded(true);
        });
    }, []);

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
                isLoaded ?
                    (isAuthorized ? <></> : signForm())
                    :
                    (<LoadingCircle size={LoadingCircleSize.Large} />)
            }
        </>
    );
};

export default AuthPage;