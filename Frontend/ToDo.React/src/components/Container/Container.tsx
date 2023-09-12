import { FC, PropsWithChildren } from 'react';

export enum Padding {
    Small = "m-2",
    Medium = "m-5",
    Large = "m-10",
}

interface ContainerProps {
    padding: Padding;
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ padding, children }) => {
    return (
        <div className={padding}>
            {children}
        </div>
    );
};