import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./prototype3d.css";

const stage = document.querySelector<HTMLDivElement>("#stage");
if (!stage) throw new Error("3D stage element was not found.");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#f8e8f0");
scene.fog = new THREE.Fog("#f8e8f0", 10, 24);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 2.25, 7.7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 10;
controls.minPolarAngle = Math.PI * 0.28;
controls.maxPolarAngle = Math.PI * 0.62;
controls.target.set(0, 1.45, 0);

scene.add(new THREE.HemisphereLight("#ffffff", "#c9a5b7", 2.1));
const keyLight = new THREE.DirectionalLight("#ffffff", 2.5);
keyLight.position.set(-3, 7, 5);
keyLight.castShadow = true;
scene.add(keyLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(5, 64),
  new THREE.MeshStandardMaterial({ color: "#fff9fc", roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.04;
floor.receiveShadow = true;
scene.add(floor);

const platform = new THREE.Mesh(
  new THREE.CylinderGeometry(1.35, 1.45, 0.18, 64),
  new THREE.MeshStandardMaterial({ color: "#b9e6c7", roughness: 0.75 })
);
platform.position.y = 0.05;
platform.castShadow = true;
platform.receiveShadow = true;
scene.add(platform);

const avatar = new THREE.Group();
avatar.position.y = 0.16;
scene.add(avatar);

function material(color: string, roughness = 0.78) {
  return new THREE.MeshStandardMaterial({ color, roughness });
}
function ball(parent: THREE.Object3D, color: string, pos: [number, number, number], scale: [number, number, number]) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), material(color));
  mesh.position.set(...pos);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function capsule(parent: THREE.Object3D, color: string, pos: [number, number, number], radius: number, length: number) {
  const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 6, 12), material(color));
  mesh.position.set(...pos);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

// Legs and pink shoes
capsule(avatar, "#f2c7a9", [-0.19, 0.48, 0], 0.105, 0.55);
capsule(avatar, "#f2c7a9", [0.19, 0.48, 0], 0.105, 0.55);
ball(avatar, "#f28eb5", [-0.19, 0.16, 0.08], [0.18, 0.10, 0.27]);
ball(avatar, "#f28eb5", [0.19, 0.16, 0.08], [0.18, 0.10, 0.27]);

// Pink outfit and arms
ball(avatar, "#f5a2c2", [0, 1.17, 0], [0.47, 0.56, 0.29]);
ball(avatar, "#f5a2c2", [0, 0.86, 0], [0.42, 0.28, 0.31]);
const leftArm = capsule(avatar, "#f2c7a9", [-0.53, 1.2, 0], 0.105, 0.48);
const rightArm = capsule(avatar, "#f2c7a9", [0.53, 1.2, 0], 0.105, 0.48);
leftArm.rotation.z = -0.48;
rightArm.rotation.z = 0.48;
ball(avatar, "#f2c7a9", [-0.63, 0.91, 0], [0.12, 0.13, 0.12]);
ball(avatar, "#f2c7a9", [0.63, 0.91, 0], [0.12, 0.13, 0.12]);

// Neck and head
capsule(avatar, "#f2c7a9", [0, 1.63, 0], 0.12, 0.22);
ball(avatar, "#f4cdb4", [0, 2.08, 0], [0.52, 0.59, 0.46]);

// Brown hair cap, back hair and side locks
ball(avatar, "#75472f", [0, 2.34, -0.08], [0.55, 0.42, 0.49]);
ball(avatar, "#75472f", [0, 1.98, -0.31], [0.48, 0.61, 0.24]);
ball(avatar, "#75472f", [-0.45, 2.03, -0.03], [0.16, 0.49, 0.18]);
ball(avatar, "#75472f", [0.45, 2.03, -0.03], [0.16, 0.49, 0.18]);

// Friendly face, looking toward the front (+Z)
ball(avatar, "#ffffff", [-0.18, 2.12, 0.405], [0.075, 0.095, 0.045]);
ball(avatar, "#ffffff", [0.18, 2.12, 0.405], [0.075, 0.095, 0.045]);
ball(avatar, "#51372f", [-0.17, 2.11, 0.445], [0.035, 0.052, 0.022]);
ball(avatar, "#51372f", [0.19, 2.11, 0.445], [0.035, 0.052, 0.022]);
ball(avatar, "#f29caf", [-0.29, 1.98, 0.39], [0.09, 0.045, 0.025]);
ball(avatar, "#f29caf", [0.29, 1.98, 0.39], [0.09, 0.045, 0.025]);
const smile = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 24, Math.PI), material("#9b5b62"));
smile.position.set(0, 1.96, 0.43);
smile.rotation.z = Math.PI;
avatar.add(smile);

// Pink bow on the upper left side of her hair
const bowLeft = ball(avatar, "#f477a8", [-0.25, 2.66, 0.13], [0.17, 0.11, 0.08]);
bowLeft.rotation.z = -0.45;
const bowRight = ball(avatar, "#f477a8", [-0.04, 2.66, 0.13], [0.17, 0.11, 0.08]);
bowRight.rotation.z = 0.45;
ball(avatar, "#ffd0df", [-0.145, 2.66, 0.205], [0.055, 0.06, 0.035]);

// Decorative room accents
for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2;
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 12),
    material(i % 2 ? "#f6c5d9" : "#f5d77d")
  );
  star.position.set(Math.cos(angle) * 2.35, 1.15 + (i % 3) * 0.45, Math.sin(angle) * 2.1 - 0.2);
  scene.add(star);
}

function resize() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener("resize", resize);
resize();

let spinning = false;
document.querySelector("#front")?.addEventListener("click", () => {
  avatar.rotation.y = 0;
  controls.reset();
});
document.querySelector("#reset")?.addEventListener("click", () => {
  avatar.rotation.y = 0;
  camera.position.set(0, 2.25, 7.7);
  controls.target.set(0, 1.45, 0);
  controls.update();
});
document.querySelector("#spin")?.addEventListener("click", () => {
  spinning = !spinning;
  const button = document.querySelector<HTMLButtonElement>("#spin");
  if (button) button.textContent = spinning ? "⏸ Stop" : "✨ Spin";
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (spinning) avatar.rotation.y += delta * 1.2;
  controls.update();
  renderer.render(scene, camera);
}
animate();