import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";
import Lenis from "@studio-freight/lenis";


const url1 = new URL("/spidey.glb", import.meta.url);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#c1"),
});

const canvasCont = document.querySelector("#p1");
renderer.setSize(canvasCont.offsetWidth, canvasCont.offsetHeight);

const scene = new THREE.Scene();

const light1 = new THREE.PointLight(0xff0000, 1000);
light1.position.set(2.5, 2.5, 2.5);

const camera = new THREE.PerspectiveCamera(
  45,
  canvasCont.offsetWidth / canvasCont.offsetHeight,
  0.1,
  1000
);

renderer.setClearColor(0x000000);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

camera.position.set(0, -15, 20);
camera.lookAt(0, 0, 0);
orbit.update();

const minPolarAngle = Math.PI / 2;
const maxPolarAngle = (3 * Math.PI) / 5;
const minAzimuthAngle = -Math.PI / 4;
const maxAzimuthAngle = Math.PI / 4;

orbit.minPolarAngle = minPolarAngle;
orbit.maxPolarAngle = maxPolarAngle;
orbit.minAzimuthAngle = minAzimuthAngle;
orbit.maxAzimuthAngle = maxAzimuthAngle;

const assetLoader = new GLTFLoader();

let mixer;
assetLoader.load(
  url1.href,
  function (gltf) {
    const model = gltf.scene;

    model.traverse((node) => {
      if (node.isMesh && node.material) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(url1.href, (loadedTexture) => {
          loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          loadedTexture.needsUpdate = true;
        });
        node.material.map = texture;

        node.material.needsUpdate = true;
      }
    });

    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const clock = new THREE.Clock();
function animate() {
  if (mixer) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = canvasCont.offsetWidth / canvasCont.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasCont.offsetWidth, canvasCont.offsetHeight);
});

function addLights() {
  renderer.setClearColor(0x111010);
  scene.add(light1);
}

window.addEventListener("load", () => {
  setTimeout(addLights, 2000);
});

let t1 = gsap.timeline({
  duration: 3,
  scrollTrigger: {
    trigger: "#p1-h #p1-a",
    start: "top center",
    end: "bottom center",
    scrub: true,
    markers: true,
  },
});

t1.to("#p1-h", {
  x: 670,
  y: -300,
});

t1.to("#p1-a", {
  x: -620,
  y: -400,
});

///////////////////////////////////////////////////////////////////////////

const textureUrl = new URL("/final.glb", import.meta.url);
const renderer2 = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#c2"),
});

const canvasCont2 = document.querySelector("#c2");
renderer2.setSize(canvasCont2.offsetWidth, canvasCont2.offsetHeight);

const scene2 = new THREE.Scene();

const light2 = new THREE.DirectionalLight(0xffffff, 1000);
light2.position.set(100, 10, 10);
scene2.add(light2);

const camera2 = new THREE.PerspectiveCamera(
  75,
  canvasCont2.offsetWidth / canvasCont2.offsetHeight,
  0.1,
  1000
);
camera2.position.set(0, 150, 5);

renderer2.setClearColor(0x111010);

const controls2 = new OrbitControls(camera2, renderer2.domElement);
controls2.enableZoom = false;
controls2.update();

let model2;

const loader2 = new GLTFLoader();
loader2.load(
  textureUrl.href,
  function (gltf2) {
    model2 = gltf2.scene;

    model2.traverse((node2) => {
      if (node2.isMesh && node2.material) {
        node2.material.dispose(); // Dispose existing material
        const metallicMaterial = new THREE.MeshStandardMaterial({
          color: 0x0000ff,
          metalness: 1,
          roughness: 0,
        });
        node2.material = metallicMaterial;
      }
    });

    scene2.add(model2);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

function animate2() {
  requestAnimationFrame(animate2);

  controls2.update();

  renderer2.render(scene2, camera2);
  if (model2) model2.rotation.z += 0.005;
}

animate2();

window.addEventListener("resize", function () {
  camera2.aspect = canvasCont2.offsetWidth / canvasCont2.offsetHeight;
  camera2.updateProjectionMatrix();
  renderer2.setSize(canvasCont2.offsetWidth, canvasCont2.offsetHeight);
});

const Url3 = new URL("/newdrone.glb", import.meta.url);

const renderer3 = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#c3"),
});

const canvasCont3 = document.querySelector("#p3");
renderer3.setSize(canvasCont3.offsetWidth, canvasCont3.offsetHeight);

const scene3 = new THREE.Scene();

const light3 = new THREE.PointLight(0xffffff, 1000);
light3.position.set(2.5, 2.5, 2.5);
scene3.add(light3);

const camera3 = new THREE.PerspectiveCamera(
  45,
  canvasCont3.offsetWidth / canvasCont3.offsetHeight,
  0.1,
  1000
);

renderer3.setClearColor(0x111010);

const orbit3 = new OrbitControls(camera3, renderer3.domElement);
orbit3.enableZoom = false;

camera3.position.set(2, -1, 2);
camera3.lookAt(0, 0, 0);
orbit3.update();

const assetLoader3 = new GLTFLoader();

let mixer3;
assetLoader3.load(
  Url3.href,
  function (gltf3) {
    const model3 = gltf3.scene;

    model3.traverse((node3) => {
      if (node3.isMesh && node3.material) {
        // Load and assign texture with correct encoding
        const textureLoader3 = new THREE.TextureLoader();
        const texture3 = textureLoader3.load(Url3.href, (loadedTexture3) => {
          loadedTexture3.anisotropy = renderer3.capabilities.getMaxAnisotropy();
          loadedTexture3.needsUpdate = true;
        });
        node3.material.map = texture3;
        node3.material.needsUpdate = true;
      }
    });

    scene3.add(model3);
    mixer3 = new THREE.AnimationMixer(model3);
    const clips3 = gltf3.animations;
    clips3.forEach(function (clip3) {
      const action3 = mixer3.clipAction(clip3);
      action3.play();
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const clock3 = new THREE.Clock();
function animate3() {
  if (mixer3) mixer3.update(clock3.getDelta());
  renderer3.render(scene3, camera3);
}

renderer3.setAnimationLoop(animate3);

window.addEventListener("resize", function () {
  camera3.aspect = canvasCont3.offsetWidth / canvasCont3.offsetHeight;
  camera3.updateProjectionMatrix();
  renderer3.setSize(canvasCont3.offsetWidth, canvasCont3.offsetHeight);
});

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

let zoomTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#p1 div",
    start: "center center",
    end: "bottom center",
    scrub: 0.7,
    markers: false,
  },
  onComplete: () => {
    gsap.to(window, {
      duration: 0.5, // Adjust the duration as needed
      scrollTo: "#p2",
      ease: "power2.inOut",
    });
  },
});

zoomTimeline.to("#c1", {
  scale: 6,
});


let zoomTimeline2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#c2",
    start: "center center",
    end: "bottom center",
    scrub: 0.7,
    markers: false,
  },
  onComplete: () => {
    gsap.to(window, {
      duration: 0.5, // Adjust the duration as needed
      scrollTo: "#p3",
      ease: "power2.inOut",
    });
  },
});

zoomTimeline2.to("#c2", {
  scale: 10,
});

let zoomTimeline3 = gsap.timeline({
  duration:3,
  scrollTrigger: {
    trigger: "#p3",
    start: "25% center",
    end: "center center",
    scrub: 0.7,
    markers: false,
  },
});

zoomTimeline3.from("#c3", {
  scale: 0.3,
});

let t2 = gsap.timeline({
  duration: 3,
  scrollTrigger: {
    trigger: "#p2",
    start: "top center",
    end: "center center",
    scrub: true,
    markers: false,
  },
});


t2.to("#d1 h1", {
  x: 670,
})

t2.to("#merged-skills", {
  x: 670,
})

t2.to("#d2", {
  x: -670,
});


// Smooth scrolling

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
