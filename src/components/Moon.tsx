import React, { useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import moon from '../assets/moon_map.jpg'

export function Moon({ rotation }) {
    const moonRef = useRef<THREE.Mesh>(null);
    const [moonTexture] = useTexture([moon]);

    useFrame(({ }) => {

        if (moonRef.current && rotation) {
            moonRef.current.rotation.x = rotation.x;
            moonRef.current.rotation.y = rotation.y;
            moonRef.current.rotation.z = rotation.z;
        }
    });

    return (
        <mesh castShadow receiveShadow ref={moonRef}>
            <cylinderGeometry args={[0.2, 0.1, 2]} />
            <meshPhongMaterial map={moonTexture} />
        </mesh>
    );
}
export default Moon;
