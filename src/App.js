import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import userObj from './0283.obj';
import userObj1 from './0058.obj';
import { useLoader } from '@react-three/fiber';
import { Suspense } from "react";

const UserModel = () => {
    const obj = useLoader(OBJLoader, userObj1);
    return (
        <mesh position={[0, 0,0]}>
            <primitive object={obj} scale={3.0}/>
        </mesh>
        
    );
    
};

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <UserModel />
        </Suspense>
      </Canvas>
    </div>
  );
}