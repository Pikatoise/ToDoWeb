import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { Container, Padding } from "@/components/Container/Container";

export const HomePage: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <Container padding={Padding.Small}>
            
        </Container>
    );
};