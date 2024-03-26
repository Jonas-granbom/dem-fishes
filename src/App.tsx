import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from "@react-three/rapier";
import { AdaptiveDpr, Html, OrbitControls, PerformanceMonitor, PerspectiveCamera } from '@react-three/drei';
import { Aquarium } from './components/Aquarium';
import { Projectiles } from './components/Projectiles';

function App() {

  return (
    <Canvas gl={{ antialias: false }} style={{ height: '100vh', width: '100vw', background: '#000000' }} >

      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <ambientLight intensity={4} />
      <spotLight position={[0, 0, -5]} />
      <Suspense>

        <Physics gravity={[0, 0, 0]} interpolate={false} >

          <Aquarium />

          <Projectiles />
        </Physics>
      </Suspense>

      {/* <Html>
        <h1 style={{}}>SCORE: {score}</h1>
      </Html> */}
    </Canvas>

  );
}

export default App;
