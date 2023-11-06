import Folder from "@/models/Folder";
import styles from "@/styles/FolderItem.module.css";
import { FC } from 'react';
import { Folder as FolderIcon } from 'lucide-react';

interface FolderItemProps {
    folder: Folder;
    isSelected: boolean;
    onClickCallBack: (folder: Folder) => void;
}

const FolderItem: FC<FolderItemProps> = ({ folder, isSelected, onClickCallBack }) => {
    return (
        <div className={[styles.folder, isSelected ? styles.selected : styles.notSelected].join(" ")} onClick={() => onClickCallBack(folder)}>
            <FolderIcon size={24} className={styles.icon} />
            <span className={styles.name}>{folder.Name}</span>
        </div>
    );
};

export default FolderItem;