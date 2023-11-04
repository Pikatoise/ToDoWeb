import Folder from "@/models/Folder";
import styles from "@/styles/FolderItem.module.css";
import { FC } from 'react';
import { Folder as FolderIcon } from 'lucide-react';

interface FolderItemProps {
    folder: Folder;
}

const FolderItem: FC<FolderItemProps> = ({ folder }) => {
    return (
        <div className={styles.folder}>
            <FolderIcon size={24} className={styles.icon} />
            <span className={styles.name}>{folder.Name}</span>
        </div>
    );
};

export default FolderItem;