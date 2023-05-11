import React, { useRef, Suspense, useState } from 'react';
// import Main from './Main';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';    
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


let objBox = []
let filepaths = []

let fs = require.context("/src/objs", true, /^.*\.obj$/);
filepaths = fs.keys();
for (let i = 0; i < filepaths.length; i++) {
    const objPath = require("/src/objs/" +
        filepaths[i].split("/")[1].split(".")[0] +
        ".obj");
  objBox[filepaths[i].split("/")[1].split(".")[0] + ".obj"] = objPath;
}

// let objKeys = Object.keys(objBox);

let strArr = []
for (let objKey in objBox) {
  if(objBox.hasOwnProperty(objKey)) {
    strArr.push(objBox[objKey]);
  }
}

const UserModel = () => {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const objList = useLoader(OBJLoader, strArr);
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      onClick={(event) => setActive(!active)}
    >
      <meshPhongMaterial color="royalblue" />
      {objList.map((obj, index) => (
        <primitive
          onPointerOver={(event) => {
            setHover(true)
            obj.children[0].material.color.r = 0.2
            obj.children[0].material.color.g = 0.5
            obj.children[0].material.color.b = 0.5
          }}
          onPointerOut={(event) => {
            setHover(false)
            obj.children[0].material.color.r = 1
            obj.children[0].material.color.g = 1
            obj.children[0].material.color.b = 1
          }}
          key={index}
          object={obj}
          scale= {3}
          />
      ))}
    </mesh>
  );
};


export default function Threes(name) {
  return (
    <div className={"Threes"+name.name}>
      <Canvas>
        <OrbitControls/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <UserModel />
        </Suspense>
      </Canvas>
    </div>
  );
}