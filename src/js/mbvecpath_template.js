if (!mbpreserve) mbremoveall(mathbox, ["matrix", "vector"]) //reset old versions

divisions = span

var d1dims = 3
var mbjl_loop = true
var vec_trails = 1
var firstidx = 0
var lastidx = 0
var last_valid_baseidx = data1.length - 6
var prev_incrt = 0
var vecs_per_sec = 1
var vecs_delta_secs = 1/vecs_per_sec
var incr_count = 0
view
  .matrix({
    width:  drows1/d1dims,
    height: dcols1,
    expr: function (emit, x, y, t, d) {
      var idx = x + y*drows1 // baseidx(x,y,t)
      if (idx <= last_valid_baseidx && idx >= firstidx && idx <= lastidx){
        if (vec_trails > 0 && incr_count > vec_trails && idx == firstidx){
          emit(
            mbbasic_lerp(data1[idx],   data1[idx+3], lerpfraction),
            mbbasic_lerp(data1[idx+1], data1[idx+4], lerpfraction),
            mbbasic_lerp(data1[idx+2], data1[idx+5], lerpfraction)
          ) //interpolated bases
        }else{
          emit(data1[idx], data1[idx+1], data1[idx+2]) //bases
        }
        lerpfraction = (t - prev_incrt)/vecs_delta_secs
        if (idx == lastidx){
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
        if(vec_trails >= 0 && incr_count > vec_trails) firstidx += d1dims
        prev_incrt = t
        if (mbjl_loop && lastidx > last_valid_baseidx){
          firstidx = lastidx = 0
          incr_count = 0
        }
      }
    },
    items: 2,
    channels: 3,
  });

view.matrix({
  width:  drows1/d1dims,
  height: dcols1,
  expr: function(emit, x, y, t, d){
    var idx = x + y*drows1 // baseidx(x,y,t)
    colr = colors[(idx/3)%colors.length]
    emit(colr.r, colr.g, colr.b, 1)
  }
})
// Draw a vector
view.vector({
  color: 0x3090FF,
  colors: "<",
  width: 3,
  points: "<<",
  end: true,
})

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
