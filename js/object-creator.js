var THREE = require('three')

function createAmbientLight () {
  return new THREE.AmbientLight(0xEEEEEE, 0.75)
}

function createDirectionalLight () {
  var directionalLight = new THREE.DirectionalLight(0x999999, 0.5)
  directionalLight.position.set(10, 1, 10)
  return directionalLight
}

function createModel (geometry) {
  var material = new THREE.MeshLambertMaterial({
    color: '#ed8989',
    flatShading: true
  })

  var model = new THREE.Mesh(
    geometry,
    material
  )

  model.scale.x = 0.1
  model.scale.y = 0.1
  model.scale.z = 0.1

  return model
}

module.exports = {
  createAmbientLight: createAmbientLight,
  createDirectionalLight: createDirectionalLight,
  createModel: createModel
}
