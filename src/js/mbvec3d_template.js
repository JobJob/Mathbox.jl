if (!mbpreserve) mbremoveall(mathbox, ["matrix", "vector"]) //reset old versions

divisions = span
var k = 1
view
  .matrix({
    width:  drows1,
    height: dcols1,
    expr: function (emit, x, y, t, d) {
      var idx = x + y*drows1
      emit(data2[idx], data2[idx+1], data2[idx+2]) //data2 are the bases
      emit(data1[idx], data1[idx+1], data1[idx+2]) //data1 are the heads
    },
    items: 2,
    channels: 3,
  });

// Draw a vector
view.vector({
  color: 0x3090FF,
  width: 3,
  end: true,
})
