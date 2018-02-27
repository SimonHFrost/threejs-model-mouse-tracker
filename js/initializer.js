/* global requestAnimationFrame */
var THREE = require('three')

function createRenderer () {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setClearColor(new THREE.Color('lightblue'), 1)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  return renderer
}

function createCamera (renderer) {
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera.position.z = 5
  camera.position.y = 3
  // FIXME: Add orbit controller dependency?
  // var controls = new THREE.OrbitControls(camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)
  return camera
}

function createRenderLoop () {
  var renderLoop = []
  var before = null
  requestAnimationFrame(function animate (now) {
    requestAnimationFrame(animate)
    before = before || now - 1000 / 60
    var deltaMsec = Math.min(200, now - before)
    before = now
    renderLoop.forEach(function (renderLoop) {
      renderLoop(deltaMsec / 1000, now / 1000)
    })
  })
  return renderLoop
}

function initialize () {
  var renderer = createRenderer()
  var renderLoop = createRenderLoop()
  var scene = new THREE.Scene()
  var camera = createCamera(renderer)

  renderLoop.push(function () {
    renderer.render(scene, camera)
  })

  return {
    scene: scene,
    camera: camera
  }
}

module.exports = {
  initialize: initialize
}
