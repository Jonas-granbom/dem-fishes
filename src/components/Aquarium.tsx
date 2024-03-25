
import { useEffect, useState } from "react";
import AnglerFish from "./AnglerFish";

export function Aquarium({ }) {
    const [fishes, setFishes] = useState<any>([]);

    useEffect(() => {
        const initialFishes = [...Array(125)].map((_, index) => ({
            id: index,
            scale: 0.3,
            position: offSetPositions(index)
        }));

        setFishes(initialFishes);
    }, []);

    const offSetPositions = (index: number): number[] => {
        if (index < 25) {
            return [-2, -2, 0];
        } else if (index > 25 && index < 50) {
            return [-1, -1, 0];

        } else if (index > 50 && index < 75) {
            return [0, 0, 0];
        } else return [1, 1, 0]
    }

    return (
        <>
            {fishes.map((fish, index) => (
                <AnglerFish index={index} position={fish.position} scale={fish.scale} />
            ))}

        </>
    );
};