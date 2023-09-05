import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegisterForm } from "@/hooks/useRegisterForm";
import styles from '@/styles/SignForm.module.css';
import { FC } from 'react';
import { ArrowLeft } from "lucide-react";

export interface RegisterFormProps {
    changeSign: Function;
    interfaceStatus: boolean;
}

export const RegisterForm: FC<RegisterFormProps> = ({ changeSign, interfaceStatus }) => {
    const {
        registerLogin,
        registerPassword,
        registerConfirmPassword,
        onSubmit,
        errors
    } = useRegisterForm(changeSign);

    const tabIndex = interfaceStatus ? 0 : -1;

    return (
        <form
            className={[styles.form, interfaceStatus ? "" : styles.blockedForm].join(' ')}
            onSubmit={onSubmit}>
            <Card className={styles.card}>
                <CardHeader className="relative flex flex-row justify-center -left-5">
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => changeSign()}
                        tabIndex={tabIndex}>
                        <ArrowLeft />
                    </Button>

                    <CardTitle>
                        Регистрация
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        {...registerLogin}
                        placeholder="Логин"
                        className={styles.input}
                        tabIndex={tabIndex} />

                    <div className={styles.errorText}>
                        {errors?.login && <p>{errors.login.message}</p>}
                    </div>

                    <div className="mb-4" />

                    <Input
                        {...registerPassword}
                        type="password"
                        placeholder="Пароль"
                        className={styles.input}
                        tabIndex={tabIndex} />

                    <div className={styles.errorText}>
                        {errors?.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className="mb-4" />

                    <Input
                        {...registerConfirmPassword}
                        type="password"
                        placeholder="Повторите пароль"
                        className={styles.input}
                        tabIndex={tabIndex} />

                    <div className={styles.errorText}>
                        {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>
                </CardContent>

                <div className="mb-4" />

                <CardFooter className={styles.footer}>
                    <Button
                        className={styles.buttonSubmit}
                        type="submit"
                        tabIndex={tabIndex}>
                        Зарегистрироваться
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};