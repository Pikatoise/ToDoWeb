import User from "@/models/User";
import { createContext, useState, FC, PropsWithChildren, useEffect } from 'react';
import ErrorType from "@/models/errorTypes";
import { useSession } from "@/hooks/useSession";
import { AuthUser } from "@/api/Account";

interface SignInProps {
    User: User,
    IsRemember: boolean,
    CallbackSuccess: () => void,
    CallbackError: (type: ErrorType, message: string) => void;
}

interface SignUpProps {
    User: User,
    CallbackSuccess: () => void,
    CallbackError: (type: ErrorType, message: string) => void;
}

interface ContextProps {
    user: User | null,
    signIn: (params: SignInProps) => void,
    signUp: (params: SignUpProps) => void,
    signOut: (cb: () => void) => void;
}

export const AuthContext = createContext<ContextProps | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { getSession, createSession, clearSession } = useSession();

    const [user, setUser] = useState<User | null>(getSession());

    const signIn = async (params: SignInProps) => {
        const response = AuthUser(params.User.Login ?? "", params.User.Password ?? "");

        console.log((await response).id);
        //console.log(response);
        // response.then(d => {
        //     console.log(d);

        //     if (d.error) {
        //         //params.CallbackError();

        //         return;
        //     }

        //     if (params.IsRemember) {
        //         createSession(params.User);
        //     }

        //     setUser(params.User);

        //     params.CallbackSuccess();
        // });
    };

    const signUp = (params: SignUpProps) => {
        // fetch auth api

        params.CallbackSuccess();
    };

    const signOut = (callback: () => void) => {
        clearSession();

        setUser(null);

        callback();
    };

    const value: ContextProps = { user, signIn, signUp, signOut };

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>);
}; 