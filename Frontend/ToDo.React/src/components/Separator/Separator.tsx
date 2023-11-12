import { FC } from 'react';

export enum Orientation {
    Vertical = "min-h-max border-s-2",
    Horizontal = "min-w-max border-t-2"
}

export enum Margin {
    Small = "m-2",
    Medium = "m-4",
    Big = "m-6",
}

interface SeparatorProps {
    orientation: Orientation,
    margin?: Margin,
}

const Separator: FC<SeparatorProps> = ({ ...props }) => {
    return (
        <div className={
            [
                props.orientation,
                props.margin,
                "border-zinc-700"
            ].join(" ")} />
    );
};

export default Separator;