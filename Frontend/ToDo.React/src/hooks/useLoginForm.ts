import { useForm } from 'react-hook-form'

interface FormData {
    login: string,
    password: string;
}

export const useLoginForm = () => {
    const {
        register,
        formState: {
            errors
        },
        setError,
        handleSubmit,
        reset
    } = useForm<FormData>({ mode: "onSubmit" });

    const tryLogin = (data: FormData) => {
        // if (data.login !== "Pikatoise") {
        //     setError("login", { type: "custom", message: "Пользователь не найден" });
        //     return;
        // }
        alert(JSON.stringify(data));

        reset();
    };

    const onSubmit = handleSubmit(tryLogin);

    const registerLogin = register('login', {
        required: "Введите логин",
        minLength: {
            value: 2,
            message: "Неверный логин"
        }
    });

    const registerPassword = register('password', {
        required: "Введите пароль",
        minLength: {
            value: 2,
            message: "Неверный пароль"
        }
    });

    return {registerLogin, registerPassword, onSubmit, errors};
}