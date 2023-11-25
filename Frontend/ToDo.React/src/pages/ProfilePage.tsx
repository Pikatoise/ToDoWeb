import useAuth from "@/hooks/useAuth";
import { FC } from 'react';

const ProfilePage: FC = () => {
    const auth = useAuth();

    return (
        <div className="h-3/4 flex justify-center items-center flex-col">
            <p className="text-9xl font-mono">
                {auth?.user?.Login}
            </p>
        </div>
    );
};

export default ProfilePage;