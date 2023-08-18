import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const LoginPage = () => {
    return (
        <form className="w-full h-full flex items-center justify-center pb-16 opacity-90">
            <Card className="bg-zinc-200 border-0 shadow-2xl min-w-max w-1/3 h-1/2 flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="text-center">Авторизация</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input placeholder="Логин" className="border-2 mb-4 focus:border-0" />
                    <Input placeholder="Пароль" className="border-2 focus:border-0" />
                </CardContent>
                <CardFooter className="flex justify-center flex-col">
                    <Button className="w-40 bg-zinc-800 hover:bg-zinc-700 mb-2">Войти</Button>
                    <Button variant="link" className="w-28 h-8 ">Регистрация</Button>
                </CardFooter>
            </Card>
        </form>
    );
};