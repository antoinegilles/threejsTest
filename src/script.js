import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// texture 
// const TEXTURE = new THREE.TextureLoader()
// const NORMALTEXTURE = TEXTURE.load('/texture/text1.png')


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

function screen() {
    const geometry1 = new THREE.BoxGeometry(6, 4, .2);
    const material1 = new THREE.MeshLambertMaterial({ color: "white" });
    const base = new THREE.Mesh(geometry1, material1)

    const geometry2 = new THREE.BoxGeometry(6.5, 4.5, .2);
    const material2 = new THREE.MeshLambertMaterial({ color: "grey" });
    const surfaceEcran = new THREE.Mesh(geometry2, material2)
    surfaceEcran.position.z = -.01

    const screen = new THREE.Group()

    screen.add(base)
    screen.add(surfaceEcran)

    return screen

}

let screenScene = screen()
scene.add(screenScene)

// material.color = new THREE.Color(0xffffff)
// material.metalness = 0.2
// material.roughness = 0.2
// material.normalMap = NORMALTEXTURE

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight('white', 2)
scene.add(pointLight2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'y').min(-3).max(6).setValue(0)
light2.add(pointLight2.position, 'x').min(-3).max(6).setValue(0)
light2.add(pointLight2.position, 'z').min(-6).max(6).setValue(30)
light2.add(pointLight2, 'intensity').min(0).max(6).setValue(.4)

const colorLight = {
    color: 0xffffff
}
light2.addColor(colorLight, 'color').onChange(() => {
    pointLight2.color.set(colorLight.color)

})
//Helper

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 3)
scene.add(pointLightHelper)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
// Control camera
let controls
controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents(window); // optional
controls.enableDamping = true
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {

    requestAnimationFrame( animate );

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();

}

function render() {

    renderer.render( scene, camera );

}

animate();
