import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => auth?.signOut(() => {
                navigate("/login");
            })}>
                Exit
            </Button>
            <div>
                <h2>
                    <p className="font-black text-9xl">Welcome {auth?.user?.Login}</p>
                    <p className="text-8xl">HomePage</p>
                </h2>
            </div>
        </>
    );
};