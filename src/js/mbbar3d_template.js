if (!mbpreserve) mbremoveall(mathbox, ["voxel", "face"]) //reset old versions

divisions = span //n.b. span set in mbscene_axes_setup.js
var barw = 0.8*span/divisions
var bard = 0.8*span/divisions // bar depth
var k = 1

view
  .voxel({
    width:  drows1,
    height: dcols1,
    depth: 6,
    expr: function (emit, x, y, z, t, d) {
      var idx = x + y*drows1
      var h = data1[idx]
      var wigglefactor = mbjlparams[divid].wigglefactor
      h += wigglefactor*Math.sin(x + y + t) // + 2*t/3)
      if (z == 0){
        //bottom (-z)
        emit(x, y, 0);
        emit(x+barw, y, 0);
        emit(x+barw, y+bard, 0);
        emit(x, y+bard, 0);
      }else if (z == 1) {
        //top (+z)
        emit(x, y, h);
        emit(x, y+bard, h);
        emit(x+barw, y+bard, h);
        emit(x+barw, y, h);
      }else if (z == 2) {
        //left (-x)
        emit(x, y, 0);
        emit(x, y, h);
        emit(x, y+bard, h);
        emit(x, y+bard, 0);
      }else if (z == 3) {
        //right
        emit(x+barw, y, 0);
        emit(x+barw, y, h);
        emit(x+barw, y+bard, h);
        emit(x+barw, y+bard, 0);
      }else if (z == 4) {
        //front
        emit(x, y, 0);
        emit(x, y, h);
        emit(x+barw, y, h);
        emit(x+barw, y, 0);
      }else if (z == 5) {
        //back
        emit(x,y+bard, 0);
        emit(x,y+bard, h);
        emit(x+barw,y+bard, h);
        emit(x+barw,y+bard, 0);
      }
    },
    items: 4,
    channels: 3,
  }).swizzle({order: "xzy"}) //only used since originally setup with z as height,
  //later changed to use y for up, as it the mouse controls worked more
  //intuitively that way

// Draw faces of the bar cuboids
var face =
view.face({
  color: 0x3090FF,
  shaded: true,
})
