
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import AnglerFish from "./AnglerFish";

export function Aquarium({ }) {

    const offSetPositions = (index: number): number[] => {
        if (index < 25) {
            return [-2, -2, 0];
        } else if (index > 25 && index < 50) {
            return [-1, -1, 0];
        } else if (index > 50 && index < 75) {
            return [0, 0, 0];
        } else { return [1, 1, 0]; }
    }
    const fishes = useMemo(() => {
        return [...Array(100)].map((_, index) => ({
            id: index,
            scale: index < 1 ? 1.5 : 0.3,
            position: offSetPositions(index),
        }));
    }, []);



    return (
        <>
            <Suspense>
                {fishes.map((fish, index) => (
                    <AnglerFish key={fish.id} index={index} position={fish.position} scale={fish.scale} />
                ))}
            </Suspense >
        </>

    );
};