import { ArrowLeft, Bell, Info, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FC, useState } from 'react';
import { ChangePasswordUser } from "@/api/AccountApi";
import Profile from "@/models/Profile";
import useAuth from "@/hooks/useAuth";
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "@/styles/ProfilePage.module.css";

const ProfilePage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile>({
        Id: -1,
        Email: null,
        isEmailVerificated: false,
        isEmailNotificationEnabled: false,
    });
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
    const [email, setEmail] = useState<string>(profile.Email ?? "");
    const [code, setCode] = useState<string>("");
    const { toast } = useToast();

    const [isShowCode, setShowCode] = useState<boolean>(profile.Email !== null && !profile.isEmailVerificated);
    const [isShowNotifyBox, setShowNotifyBox] = useState<boolean>(profile.isEmailVerificated!);
    const [isShowEmptyEmail, setShowEmptyEmail] = useState<boolean>(profile.Email === null);

    const ChangePassword = () => {
        if (newPassword.length < 5) {
            document.getElementById("newPassword")?.focus();
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            document.getElementById("newPasswordConfirm")?.focus();
            return;
        }

        ChangePasswordUser(auth?.user?.Id!, newPassword, (status: number) => {
            switch (status) {
                case 200:
                    toast({ title: "Успешно", description: "Пароль изменен" });
                    break;
                default:
                    toast({ title: "Ошибка", description: "Не удалось изменить пароль" });
                    break;
            }
        });

        setNewPassword("");
        setNewPasswordConfirm("");
    };

    const SaveEmail = () => {
        if (email !== "") {
            setProfile(v => {
                v.Email = email;
                return v;
            });

            setShowEmptyEmail(false);
            setShowCode(true);
        }
    };

    const SendCode = () => {
        if (code !== "") {
            setShowCode(false);
            setShowNotifyBox(true);
        }
    };

    const ChangeNotify = () => {
        setProfile(v => ({
            ...v,
            isEmailNotificationEnabled: !v.isEmailNotificationEnabled
        }));
    };

    const Return = () => navigate("/", { replace: true });

    return (
        <div className={styles.profile}>
            <header className={styles.header}>
                <div onClick={Return}>
                    <ArrowLeft
                        className={styles.exitArrow}
                        width={35}
                        height={35} />
                </div>

                <span className={styles.title}>Профиль</span>
            </header>

            <div className={styles.body}>
                <div className={styles.block}>
                    <span className={styles.title}>
                        <Info className={styles.icon} />
                        Личные данные
                    </span>

                    <div className={styles.field}>
                        <span className={styles.label}>Логин</span>
                        <Input
                            className={[styles.input, styles.readOnly].join(' ')}
                            disabled
                            readOnly
                            value={auth?.user?.Login!} />
                    </div>
                </div>

                <div className={styles.block}>
                    <span className={styles.title}>
                        <Shield className={styles.icon} />
                        Безопасность
                    </span>

                    <div className={styles.field}>
                        <span className={styles.label}>Новый пароль</span>
                        <Input
                            id="newPassword"
                            type="password"
                            className={styles.input}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} />
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Повторите новый пароль</span>
                        <Input
                            id="newPasswordConfirm"
                            type="password"
                            className={styles.input}
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                    </div>

                    <Button className={styles.btn} onClick={ChangePassword}>
                        Сохранить пароль
                    </Button>
                </div>

                <div className={[styles.block, styles.disabledBlock].join(' ')}>
                    <span className={styles.title}>
                        <Bell className={styles.icon} />
                        Уведомления
                    </span>

                    {
                        isShowEmptyEmail ?
                            <>
                                <div className={styles.field}>
                                    <span className={styles.label}>Email</span>
                                    <Input
                                        id="email"
                                        type="email"
                                        className={styles.input}
                                        value={email}
                                        disabled
                                        onChange={(e) => setEmail(e.target.value)} />

                                </div>

                                {
                                    profile.Email == null ?
                                        <Button className={styles.btn} disabled onClick={SaveEmail}>
                                            Подписаться
                                        </Button>
                                        :
                                        <></>
                                }
                            </>
                            :
                            <div className={styles.field}>
                                <span className={styles.label}>Email</span>
                                <Input
                                    type="email"
                                    className={[styles.input, styles.readOnly].join(' ')}
                                    disabled
                                    readOnly
                                    value={email} />
                            </div>
                    }

                    {
                        isShowCode ?
                            <>
                                <div className={styles.field}>
                                    <span className={styles.label}>Код подтверждения</span>
                                    <Input
                                        id="code"
                                        className={styles.input}
                                        value={code}
                                        disabled
                                        onChange={(e) => setCode(e.target.value)} />
                                </div>

                                <Button className={styles.btn} onClick={SendCode}>
                                    Отправить
                                </Button>
                            </>
                            :
                            <></>
                    }

                    {
                        isShowNotifyBox ?
                            <div className="flex items-center justify-around mt-2">
                                <span>Включить уведомления:</span>

                                <Checkbox
                                    checked={profile.isEmailNotificationEnabled!}
                                    disabled
                                    onClick={ChangeNotify} />
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;