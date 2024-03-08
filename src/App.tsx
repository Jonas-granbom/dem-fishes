import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Mesh from 'three';

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  const gridWidth = 50;
  const gridheight = 100;
  const boxSize = 1;
  const boxMargin = 0.5;
  const boxes: React.JSX.Element[] = [];

  for (let x = -gridheight / 2; x < gridheight / 2; x++) {
    for (let y = -gridWidth / 2; y < gridWidth / 2; y++) {
      boxes.push(
        <Box key={`${x}-${y}`} position={[x * (boxSize + boxMargin), y * (boxSize + boxMargin), 0]} />
      );
    }
  }

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 60] }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {boxes}
    </Canvas>
  );
}

export default App;

