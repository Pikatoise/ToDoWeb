import { Link } from 'react-router-dom';
import styles from '@/styles/Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <Link
                className={styles.copyrightLink}
                to="https://vk.com/pikatoise">
                © Pikatoise
            </Link>
        </footer>
    );
}