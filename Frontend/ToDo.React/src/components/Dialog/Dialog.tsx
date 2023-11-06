import { FC } from 'react';
import styles from '@/styles/Dialog.module.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogProps {
    isOpen: boolean,
    title: string,
    message: string,
    actionText: string,
    cancelText: string,
    actionCallBack: () => void,
    cancelCallBack: () => void;
}

const Dialog: FC<DialogProps> = ({ ...props }) => {
    return (
        <AlertDialog open={props.isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>{props.message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={props.cancelCallBack}>
                        {props.cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={props.actionCallBack}>
                        {props.actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Dialog;