import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Threes from './component/threeRender';
import React, { useRef, Suspense, useState, useEffect } from 'react';
// import Main from './Main';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';    
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import axios from 'axios';
axios.defaults.baseURL = "http://166.104.34.158:5000";
axios.defaults.headers.post["content-Type"] = "application/json;charset=utf-8"
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*"


const cards = [1, 2, 3, 4];
const theme = createTheme();
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

// const UserModel = () => {
//   const mesh = useRef(null)
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   const objList = useLoader(OBJLoader, strArr);
//   return (
//     <mesh
//       ref={mesh}
//       position={[0, 0, 0]}
//       onClick={(event) => setActive(!active)}
//     >
//       <meshPhongMaterial color="royalblue" />
//       {objList.map((obj, index) => (
//         <primitive
//           onPointerOver={(event) => {
//             setHover(true)
//             obj.children[0].material.color.r = 0.2
//             obj.children[0].material.color.g = 0.5
//             obj.children[0].material.color.b = 0.5
//           }}
//           onPointerOut={(event) => {
//             setHover(false)
//             obj.children[0].material.color.r = 1
//             obj.children[0].material.color.g = 1
//             obj.children[0].material.color.b = 1
//           }}
//           key={index}
//           object={obj}
//           scale= {3}
//           />
//       ))}
//     </mesh>
//   );
// };





const UserModel = ({ obj, card }) => {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const objLoader = useLoader(OBJLoader);

  if (!obj) {
    return null;
  }
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      onClick={(event) => {
        setActive(!active);
      }}
    >
      <meshPhongMaterial color="royalblue" />
      <primitive
        onPointerOver={(event) => {
              setHover(true)
              obj[card].children[0].material.color.r = 0.2
              obj[card].children[0].material.color.g = 0.5
              obj[card].children[0].material.color.b = 0.5
            }}
            onPointerOut={(event) => {
              setHover(false)
              obj[card].children[0].material.color.r = 1
              obj[card].children[0].material.color.g = 1
              obj[card].children[0].material.color.b = 1
            }}
        object={obj[card]} scale={3} />
      {/* {objLoader.map((obj, index) => (
          <primitive
            onPointerOver={(event) => {
              setHover(true)
              obj[card].children[0].material.color.r = 0.2
              obj[card].children[0].material.color.g = 0.5
              obj[card].children[0].material.color.b = 0.5
            }}
            onPointerOut={(event) => {
              setHover(false)
              obj[card].children[0].material.color.r = 1
              obj[card].children[0].material.color.g = 1
              obj[card].children[0].material.color.b = 1
            }}
            key={index}
            object={obj}
            scale= {3}
            />
        ))} */}
    </mesh>
  );
};

export default function Album () {
  const [obj, setObj] = useState(null);
  const [card, setCard] = useState(0);
  console.log(obj, !obj);

  async function postUser() {
    try {
      await axios
        .post('/send_obj', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(async (res) => {
          console.log(res.data.obj_data);
          const objLoader = new OBJLoader();
          const obj0 = await objLoader.parse(atob(res.data.obj_data[0]));
          const obj1 = await objLoader.parse(atob(res.data.obj_data[1]));
          const obj2 = await objLoader.parse(atob(res.data.obj_data[2]));
          const obj3 = await objLoader.parse(atob(res.data.obj_data[3]));
          const obj = [obj0, obj1, obj2, obj3];
          setObj(obj);
        });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            BIGsyn
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6
          }}
        ></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={8}>
            {cards.map((card, index) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className={'Threes' + card.name}>
                    <Canvas>
                      <OrbitControls />
                      <ambientLight />
                      <pointLight position={[10, 10, 10]} />
                      <Suspense fallback={null}>
                        <UserModel obj={obj} card={index} />
                      </Suspense>
                    </Canvas>
                  </div>

                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small" onClick={postUser}>
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    </ThemeProvider>
  );
}