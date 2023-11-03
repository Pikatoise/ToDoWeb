import { FC } from 'react';

export enum Orientation {
    Vertical = "min-h-max border-e-",
    Horizontal = "min-w-max border-b-"
}

interface SeparatorProps {
    orientation: Orientation,
    color?: string,
    margin?: string,
    stroke?: string;
}

const Separator: FC<SeparatorProps> = ({ orientation, color = "border-zinc-500", margin = "0", stroke = "2" }) => {
    const styles = [
        orientation + stroke,
        orientation === Orientation.Horizontal ? `mx-${margin}` : `my-${margin}`,
        color
    ].join(' ');

    return (
        <div className={styles} />
    );
};

export default Separator;