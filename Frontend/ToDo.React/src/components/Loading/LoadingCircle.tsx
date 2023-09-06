import { Loader2 } from "lucide-react";
import React, { FC } from 'react';
import styles from "@/styles/LoadingCircle.module.css";

export enum LoadingCircleSize {
    Small = "w-8 h-8",
    Medium = "w-12 h-12",
    Large = "w-16 h-12"
}

interface LoadingCircleProps {
    size: LoadingCircleSize;
}


export const LoadingCircle: FC<LoadingCircleProps> = ({ size, ...props }) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Loader2 className={[size, styles.spin].join(" ")} />
        </div>
    );
};