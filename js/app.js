var THREE = require('three')

var initialize = require('./initializer.js').initialize
var createAmbientLight = require('./object-creator.js').createAmbientLight
var createDirectionalLight = require('./object-creator.js').createDirectionalLight
var createModel = require('./object-creator.js').createModel

var output = initialize()
var scene = output.scene
var camera = output.camera

var loader = new THREE.JSONLoader()

var model = null
var modelPath = 'model/model.json'

loader.load(modelPath, function (geometry) {
  model = createModel(geometry)
  model.rotateY(Math.PI / 2)
  scene.add(model)
})

// Translating the plane changes the look at distance of the model
// Translate between 1 and 5 for varying degrees of looking sensitivity
const PLANE_DISTANCE = 1
const LOOK_DELAY = 200

var plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
plane.translate(new THREE.Vector3(0, 0, PLANE_DISTANCE))

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
var intersectPoint = new THREE.Vector3()

function onDocumentMouseMove (event) {
  // Delay following the mouse to mimic human reaction speed
  setTimeout(() => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    raycaster.ray.intersectPlane(plane, intersectPoint)

    model.lookAt(intersectPoint)
    model.rotateY(Math.PI / 2) // Model's front is the side, so rotate it by 90 degrees
  }, 200)
}

document.addEventListener('mousemove', onDocumentMouseMove, false)

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
