import User from "@/models/User";
import { createContext, useState, FC, PropsWithChildren, useEffect } from 'react';
import ErrorType from "@/models/errorTypes";
import { useSession } from "@/hooks/useSession";

interface ContextProps {
    user: User | null,
    signIn: (user: User, isRemember: boolean, cbSuccess: Function, cbError: (type: ErrorType, message: string) => void) => void,
    signUp: (user: User, cbSuccess: Function, cbError: (type: ErrorType, message: string) => void) => void,
    signOut: (cb: () => void) => void;
}

export const AuthContext = createContext<ContextProps | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { getSession, createSession, clearSession } = useSession();

    const [user, setUser] = useState<User | null>(getSession());

    const signIn = (user: User, isRemember: boolean, cbSuccess: Function, cbError: (type: ErrorType, message: string) => void) => {
        // fetch auth api

        if (isRemember) {
            createSession(user);
        }

        setUser(user);

        cbSuccess();
    };

    const signUp = (user: User, cbSuccess: Function, cbError: (type: ErrorType, message: string) => void) => {
        // fetch auth api

        cbSuccess();
    };

    const signOut = (cb: () => void) => {
        clearSession();

        setUser(null);

        cb();
    };

    const value: ContextProps = { user, signIn, signUp, signOut };

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>);
}; 