import { useState } from 'react';
import { LoginForm } from '@/components/Form/LoginForm';
import { RegisterForm } from "@/components/Form/RegisterForm";

export const AuthPage = () => {
    const [isSignIn, setSign] = useState(true);

    const changeSign = () => setSign(currentSign => !currentSign);

    return (
        <>
            {
                isSignIn ?
                    <LoginForm changeSign={changeSign} />
                    :
                    <RegisterForm changeSign={changeSign} />
            }
        </>
    );
};