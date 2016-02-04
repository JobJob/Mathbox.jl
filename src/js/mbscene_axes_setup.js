var mbdivelement = "div#"+fulldivid
var mathbox = mathBox({
  plugins: ['core', 'controls', 'cursor', 'mathbox'],
  element: mbdivelement,
  controls: {
    // Orbit controls, i.e. Euler angles, with gimbal lock
    klass: THREE.OrbitControls,

    // Trackball controls, i.e. Free quaternion rotation
    // klass: THREE.TrackballControls,
  }
});
if (mathbox.fallback) throw "WebGL not supported"
mbinstances[divid] = mathbox

var three = mathbox.three;
three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

// Do stuff with mathbox,
// for example: (see docs/intro.md)

var span = 10

// Place camera
var camera =
  mathbox
  .camera({
    proxy: true,
    position: [3, 3, 3],
    up: [0,1,0],
    fov: span
  });

// 2D cartesian
var view =
  mathbox
  .cartesian({
    range: [[-span, span], [-span, span], [-span, span]],
    // scale: [1, 1, 1],
  });

//Axes + grid
view
  .axis({
    axis: 1,
  })
  .axis({
    axis: 2,
  })
  .axis({
    axis: 3,
  })
  .grid({
    divideX: 10,
    divideY: 10,
  })
  .grid({
    divideX: 10,
    divideY: 10,
    axes: [1,3]
  })
  .grid({
    divideX: 10,
    divideY: 10,
    axes: [2,3]
  })

// Make axes black
mathbox.select('axis').set('color', 'black');

// Calibrate focus distance for units
mathbox.set('focus', 3);

// Draw ticks and labels
function addscale(view, axis, color) {
  view.scale({
    divide: 10,
    axis: axis
  }).format({
    digits: 2,
  }).label({
    color: color,
  })
}
addscale(view, 1, 'blue') //x
addscale(view, 2, 'orange') //y
addscale(view, 3, 'green') //z

mbinstances["view"+divid] = view
