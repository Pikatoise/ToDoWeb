import { FC } from 'react';

export enum Orientation {
    Vertical = "min-h-max border-e-2",
    Horizontal = "min-w-max border-b-2"
}

interface SeparatorProps {
    orientation: Orientation,
    color?: string,
    margin?: number;
}

const Separator: FC<SeparatorProps> = ({ orientation, color = "border-zinc-500", margin = 0, ...props }) => {
    const styles = [
        orientation,
        orientation === Orientation.Horizontal ? `mx-${margin}` : `my-${margin}`,
        color
    ].join(' ');

    return (
        <div className={styles} />
    );
};

export default Separator;