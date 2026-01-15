import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//initializing the scene
const Scene = new Three.Scene();

const cubeGeometry = new Three.BoxGeometry(1, 1, 1);
const cubeMaterial = new Three.MeshBasicMaterial({ color: "red" });

const cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial);

Scene.add(cubeMesh);
console.log(Scene);

//initializing the camera
const Camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);

Camera.position.z = 5;
// Note: Cameras should NOT be added to the scene

//initializing the Renderer
const canvas = document.querySelector(".Three-Canvas") as HTMLCanvasElement;

if (!canvas) {
  throw new Error("Canvas element not found");
}

const Renderer = new Three.WebGLRenderer({
  canvas: canvas,
});

//initializing the OrbitControls
const controls = new OrbitControls(Camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

const animateloop = () => {
  controls.update();
  Renderer.render(Scene, Camera);
  window.requestAnimationFrame(animateloop);
};
animateloop();
Renderer.setSize(window.innerWidth, window.innerHeight);
Renderer.render(Scene, Camera);
