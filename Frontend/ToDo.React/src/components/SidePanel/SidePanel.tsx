import React from 'react';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Separator, { Orientation } from "../Separator/Separator";
import { useAuth } from "@/hooks/useAuth";

const SidePanel = () => {
    const auth = useAuth();

    return (
        <BurgerMenu>
            <div className="flex flex-col justify-between h-24">
                <div className="flex justify-between">
                    <div className="inline">
                        {auth?.user?.Login}
                    </div>

                    <Button className="bg-transparent">
                        <LogOut color="#000" strokeWidth={3} />
                    </Button>
                </div>

                <Separator orientation={Orientation.Horizontal} margin={2} />
            </div>
        </BurgerMenu>
    );
};

export default SidePanel;