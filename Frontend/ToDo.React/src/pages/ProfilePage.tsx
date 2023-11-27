import useAuth from "@/hooks/useAuth";
import { FC, useState } from 'react';
import styles from "@/styles/ProfilePage.module.css";
import { ArrowLeft, Bell, Info, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Profile from "@/models/Profile";
import { Checkbox } from "@/components/ui/checkbox";

const ProfilePage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<Profile>({
        Id: -1,
        Email: "wierwolf@inbox.ru",
        isEmailVerificated: true,
        isEmailNotificationEnabled: false,
    });
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
    const [email, setEmail] = useState<string>(profile.Email ?? "");
    const [code, setCode] = useState<string>("");

    const [isShowCode, setShowCode] = useState<boolean>(profile.Email !== null && !profile.isEmailVerificated);
    const [isShowNotifyBox, setShowNotifyBox] = useState<boolean>(profile.isEmailVerificated!);
    const [isShowEmptyEmail, setShowEmptyEmail] = useState<boolean>(profile.Email === null);

    const ChangePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            document.getElementById("newPasswordConfirm")?.focus();
            return;
        }

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
        setProfile(v => {
            var newProfile = v;
            newProfile.isEmailNotificationEnabled = !newProfile.isEmailNotificationEnabled;
            return newProfile;
        });
    };

    const Return = () => navigate("/", { replace: true });

    return (
        <div className="flex flex-col pt-5 px-4">
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

                <div className={styles.block}>
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
                                        onChange={(e) => setEmail(e.target.value)} />

                                </div>

                                {
                                    profile.Email == null ?
                                        <Button className={styles.btn} onClick={SaveEmail}>
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
                                    onChange={ChangeNotify} />
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