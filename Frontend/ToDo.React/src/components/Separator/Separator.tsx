import { FC } from 'react';

export enum Orientation {
    Vertical = "min-h-max border-s-2",
    Horizontal = "min-w-max border-t-2"
}

export enum Margin {
    VerticalSmall = "my-2",
    VerticalMedium = "my-4",
    VerticalBig = "my-6",

    HorizontalSmall = "mx-2",
    HorizontalMedium = "mx-4",
    HorizontalBig = "mx-6"
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