// Add some 3D data
divisions = span
var k = 1
view
  .matrix({
    width:  drows,
    height: dcols,
    expr: function (emit, x, y, t, d) {
      var idx = x + y*drows
      var h = dattaboy[idx]
      var wigglefactor = mbjlparams[divid].wigglefactor
      h += wigglefactor*Math.sin(x + y + t) // + 2*t/3)
      emit(x,h,y)
    },
    // rangeX: [-span, span-1.1*barw],
    // rangeY: [-span, span-1.1*bard],
    // axes: [1, 2],
    items: 1,//dattaboy.length,
    channels: 3,
  });

// Draw a ?
var surface =
view.surface({
  color: 0x3090FF,
  shaded: true,
})

// view
// .vector({
//     end: true,
//     width: span/10,
//     color: '#50A000',
//   });
