import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import styles from '@/styles/SignForm.module.css';
import { FC } from 'react';

export interface LoginFormProps {
    changeSign: Function;
}

export const LoginForm: FC<LoginFormProps> = ({ changeSign }) => {
    const {
        registerLogin,
        registerPassword,
        onSubmit,
        errors
    } = useLoginForm();

    return (
        <form
            className={styles.form}
            onSubmit={onSubmit}>
            <Card className={styles.card}>
                <CardHeader>
                    <CardTitle className="text-center">
                        Авторизация
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        {...registerLogin}
                        placeholder="Логин"
                        className={styles.input} />

                    <div className={styles.errorText}>
                        {errors?.login && <p>{errors.login.message}</p>}
                    </div>

                    <div className="mb-4" />

                    <Input
                        {...registerPassword}
                        type="password"
                        placeholder="Пароль"
                        className={styles.input} />

                    <div className={styles.errorText}>
                        {errors?.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className="mb-4" />

                    <div className="flex justify-end">
                        <Checkbox
                            id="remember"
                            className="mx-2"/>
                        <Label 
                            htmlFor="remember"
                            className="font-normal">
                            Запомнить аккаунт
                        </Label>
                    </div>
                </CardContent>

                <div className="mb-2" />

                <CardFooter className={styles.footer}>
                    <Button
                        className={styles.buttonSubmit}
                        type="submit">
                        Войти
                    </Button>

                    <Button
                        variant="link"
                        type="button"
                        className="w-28 h-8 mb-4"
                        onClick={() => changeSign()}>
                        Регистрация
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};