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
