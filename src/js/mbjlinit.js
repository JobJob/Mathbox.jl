var mbinstances = {}
var mbjlparams = {}
var mbpreserve = false

var mbremove = function mbremove(mb, selector){ mb.select(selector).remove() }
var mbremoveall = function mbremoveall(mb, selectors){
  selectors.forEach(function(selector){ mbremove(mb, selector) })
}

var mbbasic_lerp = function (a, b, fraction){
  return a + fraction*(b-a)
}

var colors = [
  new THREE.Color('#ffb600'),
  new THREE.Color('#ccaa72'),
  new THREE.Color('#ffe9ba'),
  new THREE.Color('#67c8ff'),
  new THREE.Color('#f87f50'),
  new THREE.Color('#cccbb7'),
  new THREE.Color('#e6db7c'),
  new THREE.Color('#c4e7e9'),
  new THREE.Color('#8eb9f3'),
];
