import User from "@/models/User";
import { createContext, useState, FC, PropsWithChildren } from 'react';
import ErrorType from "@/models/errorTypes";
import { useSession } from "@/hooks/useSession";

interface ContextProps {
    user: User | null,
    signIn: (user: User, isRemember: boolean, cbSuccess: Function, cbError: (type: ErrorType, message: string) => void) => void,
    signOut: (cb: () => void) => void;
}

export const AuthContext = createContext<ContextProps | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { userSession, createSession, clearSession } = useSession();

    const [user, setUser] = useState<User | null>(userSession);

    const signIn = (user: User, isRemember: boolean, cbSuccess: Function, cbError: (type: ErrorType, message: string) => void) => {
        if (isRemember) {
            localStorage.setItem("ToDoUserId", `${user.Id}`);
            localStorage.setItem("ToDoUserLogin", user.Login ?? "");
            localStorage.setItem("ToDoUserPassword", user.Password ?? "");
            localStorage.setItem("ToDoUserProfileId", `${user.ProfileId}`);
        }

        setUser(user);

        cbSuccess();
    };

    const signOut = (cb: () => void) => {
        localStorage.removeItem("ToDoUserId");
        localStorage.removeItem("ToDoUserLogin");
        localStorage.removeItem("ToDoUserPassword");
        localStorage.removeItem("ToDoUserProfileId");

        setUser(null);

        cb();
    };

    const value: ContextProps = { user, signIn, signOut };

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>);
}; 