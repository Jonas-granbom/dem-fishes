import { RigidBody, interactionGroups } from "@react-three/rapier";
import { Vector3Tuple } from "three";

import Moon from "./Moon";
import * as THREE from 'three';

import { useCallback, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

let nextProjectileId = 0;


type ProjectileState = {
    id: number;
    initialPosition: Vector3Tuple;
    initialVelocity: Vector3Tuple;
};
const MoonProjectile = ({ initialPosition, initialVelocity }) => (
    <RigidBody type="dynamic" collisionGroups={interactionGroups(1, 2)} position={initialPosition} linearVelocity={initialVelocity}>
        <Moon rotation={{ x: 0, y: 0, z: Math.atan2(initialVelocity[1], initialVelocity[0]) + Math.PI / 2 }} />
    </RigidBody>
);

const calculateMousePositionInWorld = (event: { clientX: number; clientY: number; }, camera: THREE.Camera, domElement: HTMLCanvasElement) => {
    const rect = domElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = -(event.clientY - rect.top) / rect.height * 2 + 1;
    const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(distance));
};

const Cannon = ({ position }) => {
    const { camera, gl: { domElement } } = useThree();
    const [rotationZ, setRotationZ] = useState(0);

    useEffect(() => {
        const updateCannonRotation = (event: { clientX: number; clientY: number; }) => {
            const pos = calculateMousePositionInWorld(event, camera, domElement);
            const aimAngle = Math.atan2(pos.y - position[1], pos.x - position[0]);
            setRotationZ(aimAngle - Math.PI / 2);
        };

        window.addEventListener('mousemove', updateCannonRotation);
        return () => window.removeEventListener('mousemove', updateCannonRotation);
    }, [camera, domElement, position]);

    return (
        <mesh position={position} rotation={[0, 0, rotationZ]}>
            <cylinderGeometry args={[0.5, 1, 2]} />
            <meshStandardMaterial color={'#D3D3D3'} />
        </mesh>
    );
};

export const Projectiles = () => {
    const { camera, gl: { domElement }, viewport } = useThree();
    const [projectiles, setProjectiles] = useState<ProjectileState[]>([]);

    const shootProjectile = useCallback((mouseEvent: { clientX: number; clientY: number; }) => {
        const pos = calculateMousePositionInWorld(mouseEvent, camera, domElement);
        const bottomPositionY = -viewport.height / 2;
        const aimAngle = Math.atan2(pos.y - bottomPositionY, pos.x);
        const initialPosition: Vector3Tuple = [0, bottomPositionY, 0];
        const initialVelocity: Vector3Tuple = [Math.cos(aimAngle) * 20, Math.sin(aimAngle) * 20, 0];

        setProjectiles((prev) => {
            const newProjectile = { id: nextProjectileId++, initialPosition, initialVelocity };
            const updatedProjectiles = [...prev, newProjectile];
            if (updatedProjectiles.length > 10) {
                return updatedProjectiles.slice(-10);
            }

            return updatedProjectiles;
        });
    }, [camera, domElement, viewport.height]);

    useEffect(() => {
        const handleClick = (event: { clientX: number; clientY: number; }) => {
            shootProjectile(event);
        };

        domElement.addEventListener('click', handleClick);
        return () => domElement.removeEventListener('click', handleClick);
    }, [shootProjectile, domElement]);

    return (
        <>
            <Cannon position={[0, -viewport.height / 2, 0]} />
            {projectiles.map((projectile) => (
                <MoonProjectile key={projectile.id} {...projectile} />
            ))}
        </>
    );
};