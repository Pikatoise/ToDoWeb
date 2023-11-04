import useAuth from "@/hooks/useAuth";
import { FC } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";

const HomePage: FC = () => {
    const auth = useAuth();

    return (
        <Container padding={Padding.Small} className="flex flex-row">
            <SidePanel />

            <Separator orientation={Orientation.Vertical} margin={Margin.VerticalSmall} />

            <div className="w-full min-h-full">
                123
            </div>
        </Container>
    );
};

export default HomePage;