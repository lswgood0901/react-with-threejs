import React from 'react';
// import Main from './Main';
import { Canvas } from '@react-three/fiber';
import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { Suspense } from "react";


let objBox = []
let filepaths = []
let loadedObjs = []
let fs = require.context("../src/objs", true, /^.*\.obj$/);
filepaths = fs.keys();
for (let i = 0; i < filepaths.length; i++) {
    const objPath = require("../src/objs/" +
        filepaths[i].split("/")[1].split(".")[0] +
        ".obj");
  objBox[filepaths[i].split("/")[1].split(".")[0] + ".obj"] = objPath;
}

let objKeys = Object.keys(objBox);

let strArr = []
for (let objKey in objBox) {
  if(objBox.hasOwnProperty(objKey)) {
    strArr.push(objBox[objKey]);
  }
}

const UserModel = () => {
  
  const objList = useLoader(OBJLoader, strArr);

  return (
      <mesh position={[0, 0,0]}>
          <primitive object = {objList[0]} scale={3.0}/>
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