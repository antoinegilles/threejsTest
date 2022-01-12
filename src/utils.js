const tick = () => {

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // face.rotation.y = .5 * elapsedTime
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

const WINDOWHalfX = window.innerWidth / 2
const WINDOWHalfY = window.innerHeight / 2


const clock = new THREE.Clock()

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0