import { ListTodo } from "lucide-react";
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="bg-zinc-900 px-4 pt-3 pb-4 opacity-90">
            <div className="flex">
                <Link to="/" className="flex">
                    <ListTodo className="w-10 h-10 mr-2 opacity-90" color="white" strokeWidth={2.5} />
                    <h1 className=" text-4xl font-semibold text-white text-opacity-85">
                        ToDo
                    </h1>
                </Link>
            </div>
        </header>
    );
}