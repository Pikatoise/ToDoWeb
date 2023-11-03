import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { Container, Padding } from "@/components/Container/Container";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";
import Separator, { Orientation } from "@/components/Separator/Separator";
import { LogOut } from "lucide-react";
import SidePanel from "@/components/SidePanel/SidePanel";

export const HomePage: FC = () => {
    const auth = useAuth();

    return (
        <Container padding={Padding.Small} className="flex flex-row">
            <SidePanel />

            <Separator orientation={Orientation.Vertical} />

            <div className="w-full min-h-full">
                123
            </div>
        </Container>
    );
};