(function() {
  window.addEventListener('DOMContentLoaded', function() {
    var AddMesh, addLoop, aspect, camera, colors, directionalLight, far, fov, height, i, light, meshes, near, renderer, scene, width;
    scene = new THREE.Scene();
    width = window.innerWidth;
    height = window.innerHeight;
    fov = 80;
    aspect = width / height;
    near = 1;
    far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 50);
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setClearColor('#fff');
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    directionalLight = new THREE.DirectionalLight('#fff');
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    AddMesh = (function() {
      var _extend;

      _extend = function(out) {
        var i, key, val, _i, _ref, _ref1;
        out = out || {};
        for (i = _i = 1, _ref = arguments.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
          if (!arguments[i]) {
            continue;
          }
          _ref1 = arguments[i];
          for (key in _ref1) {
            val = _ref1[key];
            if (arguments[i].hasOwnProperty(key)) {
              out[key] = arguments[i][key];
            }
          }
        }
        return out;
      };

      AddMesh.defaults = {
        type: 'rect',
        width: 10,
        height: 10,
        depth: 10,
        color: 0xff0000
      };

      AddMesh.scene = scene;

      function AddMesh(options) {
        this.options = _extend({}, AddMesh.defaults, options);
        this.init();
      }

      AddMesh.prototype.init = function() {
        if (this.options.type === 'rect') {
          this.geometry = new THREE.BoxGeometry(this.options.width, this.options.height, this.options.depth);
        } else if (this.options.type === 'circle') {
          this.geometry = new THREE.CircleGeometry(this.options.width, this.options.height);
        } else if (this.options.type === 'tri') {
          this.geometry = new THREE.SphereGeometry(5, 32, 32);
        }
        this.material = new THREE.MeshPhongMaterial({
          color: this.options.color
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        return this;
      };

      AddMesh.prototype.random = function(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
      };

      AddMesh.prototype.add = function() {
        AddMesh.scene.add(this.mesh);
        return this;
      };

      AddMesh.prototype.position = function(max, min) {
        this.mesh.position.set(this.random(max, min), this.random(max, min), this.random(max, min));
        return this;
      };

      AddMesh.prototype.randomRotation = function() {
        var renderLoop, x, y, z;
        x = this.random(8, -8) / 100;
        y = this.random(8, -8) / 100;
        z = this.random(8, -8) / 100;
        (renderLoop = (function(_this) {
          return function() {
            _this.mesh.rotation.set(_this.mesh.rotation.x + x, _this.mesh.rotation.y + y, _this.mesh.rotation.z + z);
            renderer.render(scene, camera);
            return requestAnimationFrame(renderLoop);
          };
        })(this))();
        return this;
      };

      return AddMesh;

    })();
    colors = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];
    meshes = [];
    i = 0;
    (addLoop = function() {
      return setTimeout(function() {
        var type;
        type = ['rect', 'circle', 'tri'][Math.floor(Math.random() * 3)];
        meshes[i] = new AddMesh({
          type: type,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
        meshes[i].position(Math.floor(Math.random() * 32), -(Math.floor(Math.random() * 32))).add().randomRotation();
        i++;
        if (i < 32) {
          return addLoop();
        }
      }, 1000);
    })();
    return renderer.render(scene, camera);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,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QUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQTNCLENBQUEsQ0FBakMsQ0FBQTtBQUFBLFFBQ0EsTUFBTyxDQUFBLENBQUEsQ0FBUCxHQUFnQixJQUFBLE9BQUEsQ0FDZDtBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47QUFBQSxVQUNBLEtBQUEsRUFBTyxNQUFPLENBQUEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsTUFBTSxDQUFDLE1BQWxDLENBQUEsQ0FEZDtTQURjLENBRGhCLENBQUE7QUFBQSxRQUtBLE1BQU8sQ0FBQSxDQUFBLENBQUUsQ0FBQyxRQUFWLENBQW1CLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLEVBQTNCLENBQW5CLEVBQW1ELENBQUEsQ0FBRSxJQUFJLENBQUMsS0FBTCxDQUFXLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixFQUEzQixDQUFELENBQXBELENBQXFGLENBQUMsR0FBdEYsQ0FBQSxDQUEyRixDQUFDLGNBQTVGLENBQUEsQ0FMQSxDQUFBO0FBQUEsUUFNQSxDQUFBLEVBTkEsQ0FBQTtBQU9BLFFBQUEsSUFBRyxDQUFBLEdBQUksRUFBUDtpQkFBZSxPQUFBLENBQUEsRUFBZjtTQVJTO01BQUEsQ0FBWCxFQVNFLElBVEYsRUFEVztJQUFBLENBQVYsQ0FBSCxDQUFBLENBNUhBLENBQUE7V0EwSUEsUUFBUSxDQUFDLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBdUIsTUFBdkIsRUE3STBDO0VBQUEsQ0FBNUMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ0RPTUNvbnRlbnRMb2FkZWQnLCAtPlxuXG4gICMgc2NlbmVcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuXG4gIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgZm92ID0gODBcbiAgYXNwZWN0ID0gd2lkdGggLyBoZWlnaHRcbiAgbmVhciA9IDFcbiAgZmFyID0gMTAwMFxuXG5cblxuICAjIGNhbWVyYVxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgZm92LCBhc3BlY3QsIG5lYXIsIGZhclxuICBjYW1lcmEucG9zaXRpb24uc2V0IDAsIDAsIDUwXG5cblxuXG4gICMgcmVuZGVyZXJcbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlciBhbnRpYWxpYXM6IHRydWVcbiAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvciAnI2ZmZidcbiAgcmVuZGVyZXIuc2V0U2l6ZSB3aWR0aCwgaGVpZ2h0XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCByZW5kZXJlci5kb21FbGVtZW50XG5cblxuXG4gICMgbGlnaHRcbiAgZGlyZWN0aW9uYWxMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0ICcjZmZmJ1xuICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCAxLCAxLCAxXG4gIHNjZW5lLmFkZCBkaXJlY3Rpb25hbExpZ2h0XG5cbiAgIyBkaXJlY3Rpb25hbExpZ2h0MiA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0ICcjZmZmJ1xuICAjIGRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24uc2V0IDEsIDMsIDZcbiAgIyBzY2VuZS5hZGQgZGlyZWN0aW9uYWxMaWdodDJcblxuICAjIGRpcmVjdGlvbmFsTGlnaHQzID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQgJyNmZmYnXG4gICMgZGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXQgMiwgMTAsIDFcbiAgIyBzY2VuZS5hZGQgZGlyZWN0aW9uYWxMaWdodDNcblxuICBsaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQgMHg0MDQwNDBcbiAgc2NlbmUuYWRkIGxpZ2h0XG5cbiAgIyBhcmVhTGlnaHQxID0gbmV3IFRIUkVFLkFyZWFMaWdodCAweGZmZmZmZiwgMVxuICAjIHNjZW5lLmFkZCBhcmVhTGlnaHQxXG5cblxuXG4gIGNsYXNzIEFkZE1lc2hcblxuICAgICMgSGVscGVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIF9leHRlbmQgPSAob3V0KSAtPlxuICAgICAgb3V0ID0gb3V0IG9yIHt9XG4gICAgICBmb3IgaSBpbiBbMS4uLmFyZ3VtZW50cy5sZW5ndGhdXG4gICAgICAgIGlmIG5vdCBhcmd1bWVudHNbaV0gdGhlbiBjb250aW51ZVxuICAgICAgICBmb3Iga2V5LCB2YWwgb2YgYXJndW1lbnRzW2ldXG4gICAgICAgICAgaWYgYXJndW1lbnRzW2ldLmhhc093blByb3BlcnR5IGtleVxuICAgICAgICAgICAgb3V0W2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XVxuICAgICAgcmV0dXJuIG91dFxuICAgICMgSGVscGVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgQGRlZmF1bHRzID1cbiAgICAgIHR5cGU6ICdyZWN0J1xuICAgICAgd2lkdGg6IDEwXG4gICAgICBoZWlnaHQ6IDEwXG4gICAgICBkZXB0aDogMTBcbiAgICAgIGNvbG9yOiAweGZmMDAwMFxuXG4gICAgQHNjZW5lID0gc2NlbmVcblxuICAgIGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cbiAgICAgIEBvcHRpb25zID0gX2V4dGVuZCB7fSwgQWRkTWVzaC5kZWZhdWx0cywgb3B0aW9uc1xuICAgICAgIyBAc2NlbmUgPSBzY2VuZVxuICAgICAgQGluaXQoKVxuXG4gICAgaW5pdDogLT5cbiAgICAgIGlmIEBvcHRpb25zLnR5cGUgaXMgJ3JlY3QnXG4gICAgICAgIEBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSBAb3B0aW9ucy53aWR0aCwgQG9wdGlvbnMuaGVpZ2h0LCBAb3B0aW9ucy5kZXB0aFxuICAgICAgZWxzZSBpZiBAb3B0aW9ucy50eXBlIGlzICdjaXJjbGUnXG4gICAgICAgIEBnZW9tZXRyeSA9IG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSBAb3B0aW9ucy53aWR0aCwgQG9wdGlvbnMuaGVpZ2h0XG4gICAgICBlbHNlIGlmIEBvcHRpb25zLnR5cGUgaXMgJ3RyaSdcbiAgICAgICAgQGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5IDUsIDMyLCAzMlxuXG4gICAgICBAbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwgY29sb3I6IEBvcHRpb25zLmNvbG9yXG4gICAgICBAbWVzaCA9IG5ldyBUSFJFRS5NZXNoIEBnZW9tZXRyeSwgQG1hdGVyaWFsXG4gICAgICByZXR1cm4gdGhpc1xuXG4gICAgcmFuZG9tOiAobWF4LCBtaW4pIC0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKVxuXG4gICAgYWRkOiAtPlxuICAgICAgQWRkTWVzaC5zY2VuZS5hZGQgQG1lc2hcbiAgICAgIHJldHVybiB0aGlzXG5cbiAgICBwb3NpdGlvbjogKG1heCwgbWluKSAtPlxuICAgICAgQG1lc2gucG9zaXRpb24uc2V0IEByYW5kb20obWF4LCBtaW4pLCBAcmFuZG9tKG1heCwgbWluKSwgQHJhbmRvbShtYXgsIG1pbilcbiAgICAgIHJldHVybiB0aGlzXG5cbiAgICByYW5kb21Sb3RhdGlvbjogLT5cbiAgICAgIHggPSBAcmFuZG9tKDgsIC04KSAvIDEwMFxuICAgICAgeSA9IEByYW5kb20oOCwgLTgpIC8gMTAwXG4gICAgICB6ID0gQHJhbmRvbSg4LCAtOCkgLyAxMDBcbiAgICAgIGRvIHJlbmRlckxvb3AgPSA9PlxuICAgICAgICBAbWVzaC5yb3RhdGlvbi5zZXQgQG1lc2gucm90YXRpb24ueCArIHgsIEBtZXNoLnJvdGF0aW9uLnkgKyB5LCBAbWVzaC5yb3RhdGlvbi56ICsgelxuICAgICAgICByZW5kZXJlci5yZW5kZXIgc2NlbmUsIGNhbWVyYVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcmVuZGVyTG9vcFxuICAgICAgcmV0dXJuIHRoaXNcblxuXG4gIGNvbG9ycyA9IFtcbiAgICAnIzIzQUFBNCdcbiAgICAnIzVBQjVCMCdcbiAgICAnIzc4QkVCMidcbiAgICAnIzY4NkY4OSdcbiAgICAnI0RDNUQ1NCdcbiAgICAnI0RENjY2NCdcbiAgICAnI0Q5NDE0MidcbiAgICAnI0U3OEUyMSdcbiAgICAnI0U5QTIxRidcbiAgICAnI0VEQjUxQydcbiAgXVxuXG5cbiAgbWVzaGVzID0gW11cbiAgaSA9IDBcbiAgZG8gYWRkTG9vcCA9IC0+XG4gICAgc2V0VGltZW91dCgtPlxuICAgICAgdHlwZSA9IFsncmVjdCcsICdjaXJjbGUnLCAndHJpJ11bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyldXG4gICAgICBtZXNoZXNbaV0gPSBuZXcgQWRkTWVzaChcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICBjb2xvcjogY29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpXVxuICAgICAgKVxuICAgICAgbWVzaGVzW2ldLnBvc2l0aW9uKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMyKSwgLShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzMikpKS5hZGQoKS5yYW5kb21Sb3RhdGlvbigpXG4gICAgICBpKytcbiAgICAgIGlmIGkgPCAzMiB0aGVuIGFkZExvb3AoKVxuICAgICwgMTAwMClcblxuXG5cbiAgcmVuZGVyZXIucmVuZGVyIHNjZW5lLCBjYW1lcmFcbiJdfQ==