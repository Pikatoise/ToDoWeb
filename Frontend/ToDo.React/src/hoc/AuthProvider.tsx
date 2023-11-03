import User from "@/models/User";
import { createContext, useState, FC, PropsWithChildren } from 'react';
import ErrorType from "@/models/errorTypes";
import useSession from "@/hooks/useSession";
import { AuthUser, RegUser } from "@/api/Account";

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
    signOut: (callback: () => void) => void;
}

export const AuthContext = createContext<ContextProps | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { getSession, createSession, clearSession } = useSession();

    //const [user, setUser] = useState<User | null>(getSession());
    // На время теста
    const [user, setUser] = useState<User | null>({ Id: 0, Login: "TestLogin", Password: "TestPassword" });

    const signIn = async (params: SignInProps) => {
        const response = await AuthUser(params.User.Login ?? "", params.User.Password ?? "");

        if (response.id == -1) {
            switch (response.status) {
                case 400:
                    params.CallbackError(ErrorType.password, "Неверный пароль");
                    break;
                case 404:
                    params.CallbackError(ErrorType.login, "Пользователь не найден");
                    break;
            }

            return;
        }

        const userWithId: User = { ...params.User, Id: response.id };

        setUser(userWithId);

        if (params.IsRemember) {
            createSession(userWithId);
        }

        params.CallbackSuccess();
    };

    const signUp = async (params: SignUpProps) => {
        const responseStatus = await RegUser(params.User.Login ?? "", params.User.Password ?? "");

        switch (responseStatus) {
            case 200:
                params.CallbackSuccess();
                break;
            case 400:
                params.CallbackError(ErrorType.login, "Неверный логин");
                params.CallbackError(ErrorType.password, "Неверный пароль");
                break;
            case 409:
                params.CallbackError(ErrorType.login, "Логин занят");
                break;
            default:
                break;
        }
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

export default AuthProvider;