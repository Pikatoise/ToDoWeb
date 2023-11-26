import { FC, PropsWithChildren } from 'react';

export enum Padding {
    Small = "p-2",
    Medium = "p-6",
    Large = "p-10",
}

export enum Direction {
    Row = "flex-row",
    Column = "flex-col"
}

interface ContainerProps {
    padding: Padding;
    direction?: Direction;
    className?: string | undefined;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ padding, direction = Direction.Row, children, className }) => {
    return (
        <div className={["flex flex-row min-h-full max-h-full min-w-full relative", padding, className, direction].join(' ')}>
            {children}
        </div>
    );
};

export default Container;