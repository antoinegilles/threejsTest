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

// Objects

//Oeils
function tete() {
    const sphere = new THREE.SphereGeometry(3, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: '#33D7FF' })
    const visage = new THREE.Mesh(sphere, material)

    const corpsgeometry = new THREE.SphereGeometry(5, 50, 50);
    const corpsMateriel = new THREE.MeshBasicMaterial({ color: '#33D7FF' })
    const corps = new THREE.Mesh(corpsgeometry, corpsMateriel)
    corps.position.y = -8 

    const brasGaucheGeometry = new THREE.CylinderGeometry( .5, .5, 6, 20 );
    const brasGaucheMateriel = new THREE.MeshBasicMaterial({ color: 'black' })
    const brasGauche = new THREE.Mesh(brasGaucheGeometry, brasGaucheMateriel)
    brasGauche.position.x = -10 
    brasGauche.position.y = -5 
    brasGauche.rotation.y = -100 


    const geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.2);
    const material1 = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const oeil1 = new THREE.Mesh(geometry1, material1)
    // scene.add(oeil1)
    oeil1.position.z = 2.9
    oeil1.position.x = -1

    const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.2);
    const material2 = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const oeil2 = new THREE.Mesh(geometry2, material2)
    // scene.add(oeil2)
    oeil2.position.z = 2.9
    oeil2.position.x = 1

    const tete = new THREE.Group()
    tete.add(oeil1);
    tete.add(oeil2);
    tete.add(visage);
    tete.add(corps);
    tete.add(brasGauche);

    return tete

}

const face = tete()
scene.add(face)

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

const pointLight2 = new THREE.PointLight('red', 2)
pointLight2.position.set(-1.86, 1, 1)
pointLight2.intensity = 10
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
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 18
scene.add(camera)

const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'y').min(-3).max(6)
light2.add(pointLight2.position, 'x').min(-3).max(6)
light2.add(pointLight2.position, 'z').min(-3).max(6)
light2.add(pointLight2, 'intensity').min(0).max(6).setValue(0.5)

const colorLight = {
    color: 0xff0000
}
light2.addColor(colorLight, 'color').onChange(() => {
    pointLight2.color.set(colorLight.color)

})
//Helper

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

//    document.addEventListener('keydown', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const WINDOWHalfX = window.innerWidth / 2
const WINDOWHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    if (event.key === 'z') {
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 9
    }
    if (event.key === 's') {
        face.rotation.x += .01 * 10
    }
    if (event.key === 'q') {
        face.rotation.x += .01 * 10
    }
    if (event.key === 'd') {
        face.rotation.x += .01 * 10
    }
    console.log(event)
}

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    face.rotation.y = .5 * elapsedTime
    // face.rotation.x = .5 * elapsedTime
    // face.rotation.x += .5 * (targetX - face.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()