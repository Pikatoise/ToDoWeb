import useAuth from "@/hooks/useAuth";
import { FC, useState, useEffect } from 'react';
import Container, { Padding } from "@/components/Container/Container";
import Separator, { Margin, Orientation } from "@/components/Separator/Separator";
import SidePanel from "@/components/SidePanel/SidePanel";

const HomePage: FC = () => {
    const auth = useAuth();
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return (
        <Container padding={Padding.Small} className="flex flex-row">
            <SidePanel />

            {
                width > 640 ?
                    <Separator orientation={Orientation.Vertical} margin={Margin.VerticalSmall} />
                    :
                    <></>
            }

            <div className="w-full min-h-full max-sm:pt-10">
                123
            </div>
        </Container>
    );
};

export default HomePage;