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
  directionalLight.position.set 1, 1, 1
  scene.add directionalLight

  # directionalLight2 = new THREE.DirectionalLight '#fff'
  # directionalLight.position.set 1, 3, 6
  # scene.add directionalLight2

  # directionalLight3 = new THREE.DirectionalLight '#fff'
  # directionalLight.position.set 2, 10, 1
  # scene.add directionalLight3

  light = new THREE.AmbientLight 0x404040
  scene.add light

  # areaLight1 = new THREE.AreaLight 0xffffff, 1
  # scene.add areaLight1



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
      type: 'rect'
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
      if @options.type is 'rect'
        @geometry = new THREE.BoxGeometry @options.width, @options.height, @options.depth
      else if @options.type is 'circle'
        @geometry = new THREE.CircleGeometry @options.width, @options.height
      else if @options.type is 'tri'
        @geometry = new THREE.SphereGeometry 5, 32, 32

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
      x = @random(8, -8) / 100
      y = @random(8, -8) / 100
      z = @random(8, -8) / 100
      do renderLoop = =>
        @mesh.rotation.set @mesh.rotation.x + x, @mesh.rotation.y + y, @mesh.rotation.z + z
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
      type = ['rect', 'circle', 'tri'][Math.floor(Math.random() * 3)]
      meshes[i] = new AddMesh(
        type: type
        color: colors[Math.floor(Math.random() * colors.length)]
      )
      meshes[i].position(Math.floor(Math.random() * 32), -(Math.floor(Math.random() * 32))).add().randomRotation()
      i++
      if i < 32 then addLoop()
    , 1000)



  renderer.render scene, camera
