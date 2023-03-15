import React from 'react';
// import Main from './Main';
//import userObj1 from './objs/0086_0.obj';
import { Canvas } from '@react-three/fiber';
import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { Suspense } from "react";
import OrbitControls from "three-orbitcontrols";
import * as THREE from "three";


let objBox = new Array();
let filepaths = new Array();
let loadedObjs = new Array();
let fs = require.context("../src/objs", true, /^.*\.obj$/);
filepaths = fs.keys();
for (let i = 0; i < filepaths.length; i++) {
    const objPath = require("../src/objs/" +
        filepaths[i].split("/")[1].split(".")[0] +
        ".obj");
  objBox[filepaths[i].split("/")[1].split(".")[0] + ".obj"] = objPath;
}
let objKeys = Object.keys(objBox);

console.log(filepaths, objBox)
//console.log(userObj1)



const UserModel = () => {
  
  const obj = useLoader(OBJLoader, objBox[objKeys[0]]);
  console.log(obj)
//   for (let value of objKeys) {
//   loadedObjs.push(useLoader(OBJLoader, objBox[value]))
// }
  // const objList = loadedObjs.map((name)=>(<Main name={name}/>))
  return (
      <mesh position={[0, 0,0]}>
          <primitive object = {obj} scale={1.0}/>
      </mesh>
      
  );
  
};

export default function App() {
  return (
    <div className="App">
      <Canvas
      style={{ width: "30vw", height: "100vh" }}
        camera={{
          aspect: window.innerWidth / window.innerHeight,
        }}>
        <Suspense fallback={null}>
          <UserModel />
        </Suspense>
      </Canvas>
    </div>
  );
}