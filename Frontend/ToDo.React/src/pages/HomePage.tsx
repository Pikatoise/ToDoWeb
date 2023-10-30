import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { Container, Padding } from "@/components/Container/Container";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";

export const HomePage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-row min-h-full min-w-full">
            <BurgerMenu>

            </BurgerMenu>

            <div className="w-full min-h-full">

            </div>
        </div>
    );
};