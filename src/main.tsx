import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Pane } from "tweakpane";

// console.log(window.devicePixelRatio);

//texture Loader
const TextureLoader = new Three.TextureLoader();
const texture = TextureLoader.load(
  "/texture/texture/dry-rocky-ground_preview.jpg",
);

//initializing the scene
const Scene = new Three.Scene();

// const planeGeometry = new Three.PlaneGeometry(10, 10);

const cubeGeometry = new Three.BoxGeometry(1, 1, 1);
// const cubeGeometry = new Three.CircleGeometry(3, 36);

// custome gemotry
// const gemotry = new Three.BufferGeometry();
// const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);

// const BufferGeometry = new Three.BufferAttribute(vertices, 3);
// gemotry.setAttribute("position", BufferGeometry);

//materials type

//meshBasicMatierial
// const cubeMaterial = new Three.MeshBasicMaterial({
//   color: "red",
//   // wireframe: true,
// });

//MeshLambertMaterial
// const cubeMaterial = new Three.MeshLambertMaterial({
//   color: "white",
// });

const cubeMaterial = new Three.MeshStandardMaterial();
cubeMaterial.color = new Three.Color("purple");
cubeMaterial.map = texture;
const cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial);
// const planeMesh = new Three.Mesh(planeGeometry, cubeMaterial);
// const cubeMesh = new Three.Mesh(gemotry, cubeMaterial);

cubeMesh.scale.setScalar(0.5);

// Scene.add(planeMesh);

//add fog
// const fog = new Three.Fog(0xffffff, 1, 5);
// Scene.fog = fog;

// Scene.background = new Three.Color(0xadd8e6);

const cubeMesh2 = new Three.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new Three.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

const axisHelper = new Three.AxesHelper(3);

//group in Threejs

// const group = new Three.Group();
// group.add(cubeMesh);
// group.add(cubeMesh2);
// group.add(cubeMesh3);
// group.scale.setScalar(2);

//vector 3
// const tempVector = new Three.Vector3(0, 3, 0);

// cubeMesh.position.copy(tempVector);
// cubeMesh.scale.set(2, 2, 2);

Scene.add(axisHelper);
// Scene.add(group);
Scene.add(cubeMesh2);
Scene.add(cubeMesh);
Scene.add(cubeMesh3);
// console.log(Scene);

//light
const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
Scene.add(ambientLight);

const pointerlight = new Three.PointLight(0xffffff, 10);
pointerlight.position.set(5, 2, 2);
Scene.add(pointerlight);

// Add a light helper to visualize the point light
// const pointLightHelper = new Three.PointLightHelper(pointerlight, 0.3);
// Scene.add(pointLightHelper);

// // Also add a directional light for better visibility
// const directionalLight = new Three.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(3, 3, 3);
// Scene.add(directionalLight);

//initializing the camera
const Camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  300,
);

//orthographic Camera view
const aspect = window.innerWidth / window.innerHeight;
// const Camera = new Three.OrthographicCamera(
//   -1 * aspect,
//   1 * aspect,
//   1,
//   -1,
//   0.3,
//   300
// );

Camera.position.z = 5;
// Note: Cameras should NOT be added to the scene

//initializing the Renderer
const canvas = document.querySelector(".Three-Canvas");

if (!canvas) {
  throw new Error("Canvas element not found");
}

const Renderer = new Three.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
Renderer.setSize(window.innerWidth, window.innerHeight);
// const maxpixelRatio = Math.min(window.devicePixelRatio, 2);
// Renderer.setPixelRatio(maxpixelRatio);

// Initialize Pane after canvas is ready
const pane = new Pane();

// @ts-expect-error - Tweakpane v4 uses addBinding but types may not be fully updated
pane.addBinding(cubeMaterial, "metalness", { min: 0, max: 1, step: 0.01 });
// @ts-expect-error - Tweakpane v4 uses addBinding but types may not be fully updated
pane.addBinding(cubeMaterial, "roughness", { min: 0, max: 1, step: 0.01 });

//initializing the OrbitControls
const controls = new OrbitControls(Camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  Camera.aspect = aspect;
  Camera.updateProjectionMatrix();
  Renderer.setSize(window.innerWidth, window.innerHeight);
});

//initalizing clock
// const clock = new Three.Clock();
// let previousTime = 0;

const animateloop = () => {
  // const currentTime = clock.getElapsedTime();
  // const delta = currentTime - previousTime;
  // previousTime = currentTime;
  // console.log(delta)
  // cubeMesh.rotation.y += Three.MathUtils.degToRad(10) * delta * 10;

  Renderer.render(Scene, Camera);
  controls.update();

  window.requestAnimationFrame(animateloop);
};
animateloop();
