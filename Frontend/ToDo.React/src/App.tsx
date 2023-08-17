import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex justify-center flex-col w-full h-full">
            <Header />

            <div className="mx-auto border-black border-2 h-96 justify-center flex min-w-min w-3/4 py-3.5">
                <Button
                    className="min-w-min"
                    onClick={() => setCount(count + 1)}>
                    Click : {count}
                </Button>
            </div>
        </div>
    );
}

export default App;
