import User from "@/models/User";
import { createContext, useState, FC, PropsWithChildren } from 'react';
import ErrorType from "@/models/errorTypes";
import useSession from "@/hooks/useSession";
import { AuthUser, RegUser } from "@/api/AccountApi";

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

    const [user, setUser] = useState<User | null>(getSession());
    // На время теста
    // const [user, setUser] = useState<User | null>(
    //     {
    //         Id: -1,
    //         Login: "TestLogin",
    //         Password: "TestPassword",
    //         ProfileId: -1
    //     });

    const signIn = async (params: SignInProps) => {
        AuthUser(params.User.Login ?? "", params.User.Password ?? "", (user: User, status: number) => {
            if (user?.Id == -1) {
                switch (status) {
                    case 400:
                        params.CallbackError(ErrorType.password, "Неверный пароль");
                        break;
                    case 404:
                        params.CallbackError(ErrorType.login, "Пользователь не найден");
                        break;
                }

                return;
            }

            setUser(user);

            if (params.IsRemember) {
                createSession(user!);
            }

            params.CallbackSuccess();
        });
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