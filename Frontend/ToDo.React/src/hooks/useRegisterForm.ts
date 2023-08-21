import { useForm } from 'react-hook-form'

interface FormData {
    login: string,
    password: string;
    confirmPassword: string;
}

export const useRegisterForm = () => {
    const {
        register,
        formState: {
            errors
        },
        setError,
        handleSubmit,
        reset
    } = useForm<FormData>({ mode: "onSubmit" });

    const tryRegister = (data: FormData) => {
        // if (data.login !== "Pikatoise") {
        //     setError("login", { type: "custom", message: "Пользователь не найден" });
        //     return;
        // }
        alert(JSON.stringify(data));

        reset();
    };

    const onSubmit = handleSubmit(tryRegister);

    const registerLogin = register('login', {
        required: "Введите логин",
        minLength: {
            value: 2,
            message: "Логин слишком короткий"
        }
    });

    const registerPassword = register('password', {
        required: "Введите пароль",
        minLength: {
            value: 2,
            message: "Пароль слишком короткий"
        }
    });

    const registerConfirmPassword = register('confirmPassword', {
        required: "Введите пароль повторно"
    });

    return {registerLogin, registerPassword, registerConfirmPassword, onSubmit, errors};
}