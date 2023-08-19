import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { FC } from 'react';

export interface LoginFormProps {
    setSign: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
    login: string,
    password: string;
}

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
    const {
        register,
        formState: {
            errors
        },
        setError,
        handleSubmit,
        reset
    } = useForm<FormData>({
        mode: "onBlur"
    });

    const onLogin = (data: FormData) => {
        // if (data.login !== "Pikatoise") {
        //     setError("login", { type: "custom", message: "Пользователь не найден" });
        //     return;
        // }
        alert(JSON.stringify(data));

        reset();
    };

    return (
        <form
            className="w-full h-full flex items-center justify-center pb-16 opacity-90"
            onSubmit={handleSubmit(onLogin)}>
            <Card className="bg-zinc-200 border-0 shadow-2xl min-w-max w-1/3 min-h-1/2  flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="text-center">
                        Авторизация
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        {...register('login', {
                            required: "Введите логин",
                            minLength: {
                                value: 2,
                                message: "Неверный логин"
                            }
                        })}
                        placeholder="Логин"
                        className="border-2 focus:border-0 mb-1" />
                    <div className="text-red-500">
                        {errors?.login && <p>{errors.login.message}</p>}
                    </div>

                    <div className="mb-4" />

                    <Input
                        {...register('password', {
                            required: "Введите пароль",
                            minLength: {
                                value: 2,
                                message: "Неверный пароль"
                            }
                        })}
                        type="password"
                        placeholder="Пароль"
                        className="border-2 focus:border-0 mb-1" />
                    <div className="text-red-500">
                        {errors?.password && <p>{errors.password.message}</p>}
                    </div>
                </CardContent>

                <div className="mb-4" />

                <CardFooter className="flex justify-center flex-col">
                    <Button
                        className="w-40 bg-zinc-800 hover:bg-zinc-700 mb-2"
                        type="submit">
                        Войти
                    </Button>
                    <Button
                        variant="link"
                        className="w-28 h-8 mb-4"
                        onClick={() => props.setSign(currentSign => !currentSign)}>
                        Регистрация
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};