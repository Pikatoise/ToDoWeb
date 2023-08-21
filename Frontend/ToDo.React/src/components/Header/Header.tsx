import { ListTodo } from "lucide-react";
import { Link } from 'react-router-dom';
import styles from '@/styles/Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <div className="flex">
                <Link
                    to="/"
                    className="flex">
                    <ListTodo
                        className={styles.logo}
                        color="white"
                        strokeWidth={2.5} />
                    <h1 className={styles.title}>
                        ToDo
                    </h1>
                </Link>
            </div>
        </header>
    );
}