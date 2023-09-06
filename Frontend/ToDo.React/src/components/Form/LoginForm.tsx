import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import styles from '@/styles/SignForm.module.css';

export interface LoginFormProps {
    changeSign: Function;
    interfaceStatus: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ changeSign, interfaceStatus }) => {
    const {
        registerLogin,
        registerPassword,
        registerRemember,
        onSubmit,
        errors
    } = useLoginForm();

    const tabIndex = interfaceStatus ? 0 : -1;

    return (
        <form
            className={[styles.form, interfaceStatus ? "" : styles.blockedForm].join(' ')}
            onSubmit={onSubmit}>
            <Card className={styles.card}>
                <CardHeader>
                    <CardTitle className="text-center">
                        Авторизация
                    </CardTitle>
                </CardHeader>
                <CardContent className="mb-2">
                    <Input
                        {...registerLogin}
                        placeholder="Логин"
                        className={styles.input}
                        tabIndex={tabIndex} />

                    <div className={styles.errorText}>
                        {errors?.login && <p>{errors.login.message}</p>}
                    </div>

                    <Input
                        {...registerPassword}
                        type="password"
                        placeholder="Пароль"
                        className={styles.input}
                        tabIndex={tabIndex} />

                    <div className={styles.errorText}>
                        {errors?.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        <input
                            {...registerRemember}
                            id="remember"
                            type="checkbox"
                            className={styles.checkboxRemember}
                            tabIndex={tabIndex} />
                        <Label
                            htmlFor="remember"
                            className="font-normal -mt-px cursor-pointer">
                            Запомнить аккаунт
                        </Label>
                    </div>
                </CardContent>

                <CardFooter className={styles.footer}>
                    <Button
                        className={styles.buttonSubmit}
                        type="submit"
                        tabIndex={tabIndex}>
                        Войти
                    </Button>

                    <Button
                        variant="link"
                        type="button"
                        className="w-28 h-8 mb-4"
                        onClick={() => changeSign()}
                        tabIndex={tabIndex}>
                        Регистрация
                    </Button>
                </CardFooter>
            </Card>

            {
                interfaceStatus ? <></> : <div className="text-red-700">Сервер недоступен</div>
            }
        </form>
    );
};