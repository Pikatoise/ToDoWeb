import { ListTodo } from "lucide-react";
import { Link } from 'react-router-dom';
import styles from '@/styles/Header.module.css';
import { FC } from 'react';

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className="flex">
                <ListTodo className={styles.logo} color="white" strokeWidth={2.5} />
                <h1 className={styles.title}>
                    ToDo
                </h1>
            </Link>
        </header>
    );
};

export default Header;