import { FC, PropsWithChildren } from 'react';
import {
    AlertDialog,
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
}

const Dialog: FC<PropsWithChildren<DialogProps>> = ({ children, ...props }) => {
    return (
        <AlertDialog open={props.isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>{props.message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {children}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Dialog;