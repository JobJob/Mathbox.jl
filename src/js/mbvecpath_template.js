if (!mbpreserve) mbremoveall(mathbox, ["matrix", "vector"]) //reset old versions

divisions = span

var end_cycles_waited = 0
var firstidx = 0
var lastidx = 0
var last_valid_baseidx = data1.length - 6 //need 2*3D points for a vector
var prev_incrt = 0
var vecs_delta_secs = 1/vecs_per_sec
var incr_count = 0
view
  .matrix({
    width:  drows1/d1dims,
    height: dcols1,
    expr: function (emit, x, y, t, d) {
      var idx = x + y*drows1 // baseidx(x,y,t)
      if (idx <= last_valid_baseidx
        && idx >= firstidx && idx <= lastidx){ //controls which vectors in path are shown
        var lerpfraction = (t - prev_incrt)/vecs_delta_secs
        if (vec_trails > 0 && incr_count > vec_trails //interp/slide trailing bases in
          && idx == firstidx //only the last visible base needs ot be interpolated
          && end_cycles_waited == 0 //don't interpolate if holding/pausing at end of path anim
          && idx + vec_trails*drows1 < last_valid_baseidx ){ //don't interpolate if it's the last base index (since we might be holding at the end)
          emit(
            mbbasic_lerp(data1[idx],   data1[idx+3], lerpfraction),
            mbbasic_lerp(data1[idx+1], data1[idx+4], lerpfraction),
            mbbasic_lerp(data1[idx+2], data1[idx+5], lerpfraction)
          ) //interpolated bases
        }else{
          emit(data1[idx], data1[idx+1], data1[idx+2]) //bases
        }
        if (idx == lastidx && end_cycles_waited == 0){
          emit(
            mbbasic_lerp(data1[idx],   data1[idx+3], lerpfraction),
            mbbasic_lerp(data1[idx+1], data1[idx+4], lerpfraction),
            mbbasic_lerp(data1[idx+2], data1[idx+5], lerpfraction)
          ) //interpolated heads
        }else{
          emit(data1[idx+3], data1[idx+4], data1[idx+5])
        }
      }
      if (t - prev_incrt >= vecs_delta_secs){
        lastidx += d1dims
        incr_count += 1
        if (vec_trails >= 0 && incr_count > vec_trails){
          firstidx += d1dims
        }
        prev_incrt = t
        if (mbjl_loop && lastidx > last_valid_baseidx){
          if (end_cycles_waited >= end_wait_cycles){
            firstidx = lastidx = 0
            incr_count = 0
            end_cycles_waited = 0
          }else{
            //note after this is set we still wait a whole vecs_delta_secs
            //till a potential restart
            end_cycles_waited += 1
            lastidx -= d1dims
            if (vec_trails >= 0 && incr_count > vec_trails){
              firstidx -= d1dims
            }
          }
        }
      }
    },
    items: 2,
    channels: 3,
  });


view.readback({
  expr: function (x, y, z, w, i, j, k, l) {
    console.log(x,y,z,w)
  }
})
//gradient of color to clarify of path direction
//colors specified in mbjlinit.js
var colr = colors[3]
view.matrix({
  width:  drows1/d1dims,
  height: dcols1,
  expr: function(emit, x, y, t, d){
    var idx = x + y*drows1 // baseidx(x,y,t)
    // colr = colors[(idx/3)%colors.length]
    if(idx >= firstidx && idx <= lastidx){
      total_vecs_displayed = (lastidx-firstidx)/3
      curvec = (idx-firstidx)/3
      alpha = mbbasic_lerp(0.25, 1, curvec/total_vecs_displayed)
      // emit(colr.r*scale, colr.g*scale, colr.b*scale, 1)
      emit(colr.r, colr.g, colr.b, alpha)
    }
  },
  channels: 4
})
// Draw a vector
view.vector({
  color: 0x3090FF,
  colors: "<",
  width: 3,
  points: "<<",
  end: true,
})

//point coordinate labels
view.
  array({
    data: data1,
    channels: 3,
  }).format({
    source: "<",
    expr: function(x, y, z, w, i, j, k, l, time, delta) {
      var res = "(" + [x.toFixed(1),y.toFixed(1),z.toFixed(1)].join(",") + ")"
      return res
    }
  })
  // .label({
  //   color: '#000000',
  //   points: "<",
  //   text: "<", //most recent text source
  //   // background: '#000000',
  //   zIndex: 2
  // })
