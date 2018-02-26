var THREE = require('three')

var initialize = require('./initializer.js').initialize
var createAmbientLight = require('./object-creator.js').createAmbientLight
var createDirectionalLight = require('./object-creator.js').createDirectionalLight
var createSpaceship = require('./object-creator.js').createSpaceship

var scene = initialize()

var loader = new THREE.JSONLoader()

var spaceship = null
var modelPath = 'model/spaceship.json'

loader.load(modelPath, function (geometry) {
  spaceship = createSpaceship(geometry)
  scene.add(spaceship)
})

function onDocumentMouseMove( event ) {
  var mouse = {};
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  spaceship.lookAt(new THREE.Vector3(-mouse.x, 0, mouse.y));
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

scene.add(createAmbientLight())
scene.add(createDirectionalLight())
