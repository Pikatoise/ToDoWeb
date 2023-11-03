import { Loader2 } from "lucide-react";
import { FC } from 'react';

export enum LoadingCircleSize {
    Small = "w-8 h-8",
    Medium = "w-12 h-12",
    Large = "w-16 h-12"
}

interface LoadingCircleProps {
    size: LoadingCircleSize;
}


const LoadingCircle: FC<LoadingCircleProps> = ({ size }) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Loader2 className={[size, "animate-spin"].join(" ")} />
        </div>
    );
};

export default LoadingCircle;