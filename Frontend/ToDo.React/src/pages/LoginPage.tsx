import { useState } from 'react';
import { LoginForm } from '@/components/Form/LoginForm';

export const LoginPage = () => {
    const [isSignIn, setSign] = useState(true);

    return (
        <>
            {
                isSignIn ? (<LoginForm setSign={setSign}/>) : (<p>Register</p >)
            }
        </>
    );
};