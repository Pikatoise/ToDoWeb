import Container, { Direction, Padding } from "@/components/Container/Container";
import useAuth from "@/hooks/useAuth";
import { FC } from 'react';
import styles from "@/styles/ProfilePage.module.css";
import { ArrowLeft, Bell, Info, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ProfilePage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

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
                        <Input className={[styles.input, styles.readOnly].join(' ')} disabled readOnly value={auth?.user?.Login!} />
                    </div>
                </div>

                <div className={styles.block}>
                    <span className={styles.title}>
                        <Shield className={styles.icon} />
                        Безопасность
                    </span>
                </div>

                <div className={styles.block}>
                    <span className={styles.title}>
                        <Bell className={styles.icon} />
                        Уведомления
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;