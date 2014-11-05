window.addEventListener 'DOMContentLoaded', ->

  # scene
  scene = new THREE.Scene()

  width = window.innerWidth
  height = window.innerHeight

  fov = 80
  aspect = width / height
  near = 1
  far = 1000



  # camera
  camera = new THREE.PerspectiveCamera fov, aspect, near, far
  camera.position.set 0, 0, 50



  # renderer
  renderer = new THREE.WebGLRenderer antialias: true
  renderer.setClearColor '#fff'
  renderer.setSize width, height

  document.body.appendChild renderer.domElement



  # light
  directionalLight = new THREE.DirectionalLight '#fff'
  directionalLight.position.set 0, 1, 1
  scene.add directionalLight



  class AddMesh

    # Helper ---------------------------
    _extend = (out) ->
      out = out or {}
      for i in [1...arguments.length]
        if not arguments[i] then continue
        for key, val of arguments[i]
          if arguments[i].hasOwnProperty key
            out[key] = arguments[i][key]
      return out
    # Helper ---------------------------

    @defaults =
      width: 10
      height: 10
      depth: 10
      color: 0xff0000

    @scene = scene

    constructor: (options) ->
      @options = _extend {}, AddMesh.defaults, options
      # @scene = scene
      @init()

    init: ->
      @geometry = new THREE.BoxGeometry @options.width, @options.height, @options.depth
      @material = new THREE.MeshPhongMaterial color: @options.color
      @mesh = new THREE.Mesh @geometry, @material
      return this

    random: (max, min) -> Math.floor(Math.random() * (max - min) + min)

    add: ->
      AddMesh.scene.add @mesh
      return this

    position: (max, min) ->
      @mesh.position.set @random(max, min), @random(max, min), @random(max, min)
      return this

    randomRotation: ->
      do renderLoop = =>
        @mesh.rotation.set 0, @mesh.rotation.y + (@random(16, 0) / 100), @mesh.rotation.z + (@random(20, 0) / 100)
        renderer.render scene, camera
        requestAnimationFrame renderLoop
      return this


  colors = [
    '#23AAA4'
    '#5AB5B0'
    '#78BEB2'
    '#686F89'
    '#DC5D54'
    '#DD6664'
    '#D94142'
    '#E78E21'
    '#E9A21F'
    '#EDB51C'
  ]


  meshes = []
  i = 0
  do addLoop = ->
    setTimeout(->
      meshes[i] = new AddMesh color: colors[Math.floor(Math.random() * colors.length)]
      meshes[i].position(Math.floor(Math.random() * 32), -(Math.floor(Math.random() * 32))).add().randomRotation()
      i++
      if i < 17 then addLoop()
      # addLoop()
    , 0)

  # arr = new AddMesh color: '#fff'
  # arr.add().randomRotation()

  # arr2 = new AddMesh
  # arr2.add().randomRotation()

  # arr3 = new AddMesh
  # arr3.add().randomRotation()

  # arr4 = new AddMesh
  # arr4.add().randomRotation()

  # arr5 = new AddMesh
  # arr5.add().randomRotation()

  # arr6 = new AddMesh
  # arr6.add().randomRotation()

  # # geometry
  # geometry = new THREE.CubeGeometry 10, 10, 10

  # # material
  # material = new THREE.MeshPhongMaterial color: 0xff0000

  # # mesh
  # mesh = new THREE.Mesh geometry, material

  # scene.add mesh



  renderer.render scene, camera



  # do renderLoop = ->
  #   mesh.rotation.set mesh.rotation.x + 0.01, mesh.rotation.y + 0.01, mesh.rotation.z + 0.01
  #   renderer.render scene, camera
  #   requestAnimationFrame renderLoop
