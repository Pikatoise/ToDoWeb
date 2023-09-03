import { ListTodo } from "lucide-react";
import { Link } from 'react-router-dom';
import styles from '@/styles/Header.module.css';
import { Button } from "@/components/ui/button";
import User from "@/models/User";
import axios from 'axios';

export function Header() {
    type GetUsersResponse = {
        data: User[];
    };

    async function fetchData() {
        try {
            await axios.get<GetUsersResponse>(
                "http://localhost:5038/api/Account",
                {
                    headers: {
                        Accept: "*/*"
                    }
                })
                .then(r => console.log(r.data));
        }
        catch (error) {
            console.log(error);
        }
    };

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

                <Button onClick={() => { fetchData(); }}>Click Me</Button>
            </div>
        </header>
    );
};