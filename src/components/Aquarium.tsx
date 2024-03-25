
import { useEffect, useState } from "react";
import AnglerFish from "./AnglerFish";

export function Aquarium({ }) {
    const [fishes, setFishes] = useState<any>([]);

    useEffect(() => {
        const initialFishes = [...Array(100)].map((_, index) => ({
            id: index,
            scale: 0.5,
            position: index < 50 ? [0, 0, 0] : [0, 5, 5],
        }));

        setFishes(initialFishes);
    }, []);

    return (
        <>
            {fishes.map((_, index) => (
                <AnglerFish key={index} index={index} />
            ))}

        </>
    );
};