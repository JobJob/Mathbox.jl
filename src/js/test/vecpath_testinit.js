var rand_array = function rand_array(npoints, ndims, scale){
    res = []
    for (var i=0; i < npoints; i++){
        for (var j=0; j < ndims; j++){
            res.push(Math.random()*scale)
        }
    }
    return res
}
// var data1 = [0,0,0, 1,2,3, 4,-1,-2, -3,-4,1, 2,3,4, -1,-2,-3]
var drows1 = 3
var dcols1 = 50
var scale = 6
var data1 = rand_array(dcols1, drows1, scale)
console.log(data1)
var divid = 1
var fulldivid = "mathbox-div-"+divid
var mbdivelement = "div#"+fulldivid
var mbpreserve = false
mbjlparams[divid] = {
    wigglefactor: 1
}
