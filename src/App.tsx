import * as Three from "Three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const Scene = new Three.Scene();

const SphereGeometry = new Three.SphereGeometry(1, 32, 32);

const SphereMaterial = new Three.MeshStandardMaterial();

const SphereMesh = new Three.Mesh(SphereGeometry, SphereMaterial);

Scene.add(SphereMesh);

const axisHelper = new Three.AxesHelper(3);
Scene.add(axisHelper);

const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 3;
Scene.add(camera);

const canvas = document.getElementById("Three-Canvas") as HTMLCanvasElement;

const Renderer = new Three.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

Renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animateloop = () => {
  // const currentTime = clock.getElapsedTime();
  // const delta = currentTime - previousTime;
  // previousTime = currentTime;
  // console.log(delta)
  // cubeMesh.rotation.y += Three.MathUtils.degToRad(10) * delta * 10;

  Renderer.render(Scene, camera);
  controls.update();

  window.requestAnimationFrame(animateloop);
};
animateloop();
