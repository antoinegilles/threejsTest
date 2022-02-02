import './style.css'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';



//Texture loader
const textureLoader = new THREE.TextureLoader()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

function screen() {


    const geometry2 = new RoundedBoxGeometry(6.5, 4.5, .06);
    const material2 = new THREE.MeshBasicMaterial({ color: "#ced9d1", map: textureLoader.load('/img/website.png') });
    const surfaceEcran = new THREE.Mesh(geometry2, material2)
    surfaceEcran.position.z = .02
    surfaceEcran.position.x = 0
    surfaceEcran.position.y = -.4
    surfaceEcran.rotation.x = -.07
    surfaceEcran.scale.y = .79
    surfaceEcran.scale.x = .90


    const geometryEcran = new RoundedBoxGeometry(6, 3.5, .06);
    const materialEcran = new THREE.MeshStandardMaterial({ color: "black" });
    const ecran = new THREE.Mesh(geometryEcran, materialEcran)
    ecran.rotation.x = -.07
    ecran.rotation.z = 0
    ecran.position.y = -0.4
    ecran.position.z = .1

    const screen = new THREE.Group()


    let base = new OBJLoader()
    base.load('object/plane.obj', function (object) {
        object.scale.x = .075
        object.scale.y = .07
        object.scale.z = .04
        object.rotation.x = 1.5
        object.position.y = -0.4
        object.position.z = -0.1
        object.color = "black"
        screen.add(object)
    })

    let contourEcran = new OBJLoader()
    contourEcran.load('object/contourEcran.obj', function (object) {
        object.scale.x = .126
        object.scale.y = .035
        object.scale.z = .075
        object.rotation.x = 1.5
        object.rotation.z = 0
        object.position.y = -0.4
        object.position.z = 0
        object.children[0].material.color.r = 0
        object.children[0].material.color.g = 0
        object.children[0].material.color.b = 0
        console.log(object)

        screen.add(object)
    })


    screen.add(surfaceEcran)

    return screen

}

function clavier() {
    const clavier = new THREE.Group()


    // touche entrée
    let positionEntreeX = -2.6
    let positionEntreeY = -2.43
    let positionEntreeZ = 1
    let rotationEntreeX = 1.9
    const geometryEntree = new THREE.BoxBufferGeometry(.3, .5, .2);
    const materialEntree = new THREE.MeshStandardMaterial({ color: "#363835" });


    const toucheEntree = new THREE.Mesh(geometryEntree, materialEntree)
    toucheEntree.position.x = positionEntreeX + 5.15
    toucheEntree.position.z = positionEntreeZ + 1.1
    toucheEntree.position.y = positionEntreeY - 0.3
    toucheEntree.rotation.x = rotationEntreeX

    clavier.add(toucheEntree)

    // touche delete
    let positionDeleteX = -2.6
    let positionDeleteY = -2.43
    let positionDeleteZ = 1
    let rotationDeleteX = 1.9
    const geometryDelete = new THREE.BoxBufferGeometry(.5, .2, .2);
    const materialDelete = new THREE.MeshStandardMaterial({ color: "#363835" });
    materialDelete.color = new THREE.Color("#363835")


    const toucheDelete = new THREE.Mesh(geometryDelete, materialDelete)
    toucheDelete.position.x = positionDeleteX + 5.06
    toucheDelete.position.z = positionDeleteZ + .71
    toucheDelete.position.y = positionDeleteY - 0.2
    toucheDelete.rotation.x = rotationDeleteX

    clavier.add(toucheDelete)

    // Pad numérique
    const geometryPad = new THREE.BoxBufferGeometry(1.4, .8, .2);
    const materialPad = new THREE.MeshStandardMaterial({ color: "#363835" });
    materialDelete.color = new THREE.Color("#363835")


    const pad = new THREE.Mesh(geometryPad, materialPad)
    pad.position.x = .12
    pad.position.z = 3.3
    pad.position.y = -3.1
    pad.rotation.x = 1.86
    clavier.add(pad)

    // touches standart
    const geometry = new THREE.BoxBufferGeometry(.3, .3, .2);
    const material = new THREE.MeshStandardMaterial();
    material.color = new THREE.Color("#363835")
    material.roughness = 0

    let z = 0
    let j = 0
    let k = 0
    let l = 0
    let m = 0
    for (let i = 0; i < 78; i++) {
        if (i < 15) {
            z += 0.35
            let positionX = -2.7
            let positionY = -2.43
            let positionZ = 1
            let rotationX = 1.9

            const geometryRaccourcis = new THREE.BoxGeometry(.3, .2, .2);

            const touche1 = new THREE.Mesh(geometryRaccourcis, material)
            touche1.position.x = positionX + z
            touche1.position.z = positionZ
            touche1.position.y = positionY
            touche1.rotation.x = rotationX

            clavier.add(touche1)
        } else if (i >= 15 && i < 30) {

            j += 0.35
            let positionX = -2.7
            let positionY = -2.44
            let positionZ = 1
            let rotationX = 1.9

            const touche1 = new THREE.Mesh(geometry, material)
            touche1.position.x = positionX + j
            touche1.position.z = positionZ + 0.4
            touche1.position.y = positionY - 0.1
            touche1.rotation.x = rotationX

            clavier.add(touche1)

        } else if (i >= 30 && i < 45) {
            if (i == 44 || i == 45 || i == 43) {
                null
            } else {
                k += 0.35
                let positionX = -2.7
                let positionY = -2.45
                let positionZ = 1
                let rotationX = 1.9

                const touche1 = new THREE.Mesh(geometry, material)
                touche1.position.x = positionX + k
                touche1.position.z = positionZ + 0.8
                touche1.position.y = positionY - 0.2
                touche1.rotation.x = rotationX

                clavier.add(touche1)
            }

        } else if (i >= 45 && i < 60) {
            if (i == 55) {
                null
            } else {
                l += 0.35
                let positionX = -2.7
                let positionY = -2.47
                let positionZ = 1
                let rotationX = 1.9

                const touche1 = new THREE.Mesh(geometry, material)
                touche1.position.x = positionX + l
                touche1.position.z = positionZ + 1.2
                touche1.position.y = positionY - 0.3
                touche1.rotation.x = rotationX

                clavier.add(touche1)
            }

        }
        else if (i >= 60 && i < 78) {

            if (i == 64 || i == 65 || i == 67) {
                null
            } else if (i == 69) {
                m += 0.35
                let positionX = -2.7
                let positionY = -2.4
                let positionZ = 1
                let rotationX = 1.9
                const geometry2 = new THREE.BoxGeometry(1.5, .3, .2);

                const touche1 = new THREE.Mesh(geometry2, material)
                touche1.position.x = positionX + m + 0.3
                touche1.position.z = positionZ + 1.6
                touche1.position.y = positionY - 0.5
                touche1.rotation.x = rotationX
                clavier.add(touche1)
            } else {
                m += 0.35
                let positionX = -2.7
                let positionY = -2.4
                let positionZ = 1
                let rotationX = 1.9

                const touche1 = new THREE.Mesh(geometry, material)
                touche1.position.x = positionX + m
                touche1.position.z = positionZ + 1.6
                touche1.position.y = positionY - 0.5
                touche1.rotation.x = rotationX
                clavier.add(touche1)

            }

        }


    }
    return clavier

}

function keyboard() {

    const keyboard = new THREE.Group()

    let myPlane = new OBJLoader()
    myPlane.load('object/plane.obj', function (object) {
        object.scale.x = .075
        object.scale.y = .07
        object.scale.z = .04
        object.rotation.x = 0.28
        object.position.y = -2.8
        object.position.z = 1.9
        keyboard.add(object)
    })

    return keyboard
}


// Lights

const pointLight = new THREE.PointLight(0xffffff, .8, 100)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 9
pointLight.intensity = 1

scene.add(pointLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.x = 0
camera.position.y = -2
camera.position.z = 100
scene.add(camera)

const computer = new THREE.Group()
let screenScene = screen()
screenScene.position.y=.02
let keyboardScene = keyboard()
let clavierScene = clavier()

computer.add(screenScene)
computer.add(keyboardScene)
computer.add(clavierScene)

scene.add(computer)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

function animate() {

    // Update objects

    const t = clock.getElapsedTime()
    computer.rotation.x = THREE.MathUtils.lerp(computer.rotation.x, Math.cos(t / 2) / 3 + 0.15, 0.001)
    computer.rotation.y = THREE.MathUtils.lerp(computer.rotation.y, Math.sin(t / 4) / 3, 0.01)
    computer.rotation.z = THREE.MathUtils.lerp(computer.rotation.z, Math.sin(t / 4) / 20, 0.01)
    computer.position.y = THREE.MathUtils.lerp(computer.position.y, (-5 + Math.sin(t)) / 5, 0.01)

    requestAnimationFrame(animate);
    render();

}

function render() {

    renderer.render(scene, camera);

}

animate();
