divisions = span
var k = 1
view
  .matrix({
    width:  drows1,
    height: dcols1,
    expr: function (emit, x, y, t, d) {
      var idx = x + y*drows1
      var h = data1[idx]
      var wigglefactor = mbjlparams[divid].wigglefactor
      h += wigglefactor*Math.sin(x + y + t) // + 2*t/3)
      emit(x,h,y)
    },
    items: 1,
    channels: 3,
  });

// Draw a ?
var surface =
view.surface({
  color: 0x3090FF,
  shaded: true,
})
