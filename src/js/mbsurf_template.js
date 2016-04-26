if (!mbpreserve) mbremoveall(mathbox, ["matrix", "surface"]) //reset old versions

divisions = span
var k = 1
view
  .area({
    width:  drows1,
    height: dcols1,
    rangeX: dxrange,
    rangeY: dyrange,
    expr: function (emit, x, y, i, j, t, d) {
      var idx = i + j*drows1
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
