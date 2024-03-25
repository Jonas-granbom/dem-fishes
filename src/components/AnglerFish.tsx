import { useEffect, useRef, useState } from 'react';

import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RapierRigidBody, RigidBody, interactionGroups } from '@react-three/rapier';




export function AnglerFish({ scale = 1, index, ...props }) {

    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const visualRef = useRef<any>();

    const { scene, animations } = useGLTF("/dafish.glb", true);

    const clonedScene = clone(scene);

    const { actions } = useAnimations(animations, visualRef);
    useEffect(() => {
        actions['rigAction.001']?.play();
    }, [actions]);

    useFrame(({ clock }) => {
        if (rigidBodyRef.current) {
            if (rigidBodyRef.current) {
                const time = clock.getElapsedTime() * 0.1;
                const distance = 10;
                const delay = index * 5;

                const x = Math.sin(time - delay) * distance;
                const y = Math.cos(time - delay) * distance;

                visualRef.current.rotation.x = Math.PI / 2;

                rigidBodyRef.current.setTranslation({ x: x * Math.PI, y: y * Math.PI / 5, z: 0 }, true);

                const directionAngle = Math.atan2(y, x);

                const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, directionAngle));
                rigidBodyRef.current.setRotation({ x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w }, true);
            }
        }
    });

    return (
        <RigidBody collisionGroups={interactionGroups(2, 1)} ref={rigidBodyRef} type={'fixed'} onCollisionEnter={({ }) => {


        }}{...props}>
            <primitive ref={visualRef} object={clonedScene} scale={[scale, scale, scale]} {...props} />
        </RigidBody>
    );
}

export default AnglerFish;

useGLTF.preload('/dafish.glb');