import { FC, PropsWithChildren } from 'react';

export enum Padding {
    Small = "p-2",
    Medium = "p-6",
    Large = "p-10",
}

interface ContainerProps {
    padding: Padding;
    className?: string | undefined;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ padding, children, className }) => {
    return (
        <div className={["flex flex-row min-h-full max-h-full min-w-full relative overflow-y-scroll", padding, className].join(' ')}>
            {children}
        </div>
    );
};

export default Container;