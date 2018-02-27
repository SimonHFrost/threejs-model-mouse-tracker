var THREE = require('three')

var initialize = require('./initializer.js').initialize
var createAmbientLight = require('./object-creator.js').createAmbientLight
var createDirectionalLight = require('./object-creator.js').createDirectionalLight
var createSpaceship = require('./object-creator.js').createSpaceship

var output = initialize()
var scene = output.scene
var camera = output.camera

var loader = new THREE.JSONLoader()

var spaceship = null
var modelPath = 'model/spaceship.json'

loader.load(modelPath, function (geometry) {
  spaceship = createSpaceship(geometry)
  scene.add(spaceship)
})

var plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
// Translating the plane changes the look at distance of the model
// Translate between 1 and 5 for varying degrees of looking sensitivity
plane.translate(new THREE.Vector3(0, 0, 1))

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2()
var intersectPoint = new THREE.Vector3()

function onDocumentMouseMove (event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  raycaster.ray.intersectPlane(plane, intersectPoint)
  spaceship.lookAt(intersectPoint)
  spaceship.rotateY(Math.PI / 2) // Model's front is the side, so rotate it by 90 degrees
}

document.addEventListener('mousemove', onDocumentMouseMove, false)

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
