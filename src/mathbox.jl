module Mathbox

export bar3d, vec3d, surf
using JSON
using Patchwork

include("patchworkpatch.jl")

const mbjsdir = joinpath(dirname(Base.source_path()), "js")
const mbjs = joinpath(mbjsdir, "mathbox-bundle.js") |> readall
const mbjlinitjs = joinpath(mbjsdir, "mbjlinit.js") |> readall

__init__() = begin
  try
      Patchwork.load_js_runtime()
      display("text/html", script_elem(mbjs, mbjlinitjs))
  catch e
      error(e)
  end
end

script_elem(jsstrs...) =
  Elem(:script, join(jsstrs,";\n")) & Dict(:type=>"text/javascript", :charset=>"utf-8")

plotdefaults = Dict(:height=>"500px", :wigglefactor=>0.0)

"""
Returns a div and a script which sets up a scene in the div with axes and a grid
"""
scene_setup_elem(divid, fulldivid, params) = begin
  divsetupjs = """
  var divid = "$divid"
  var fulldivid = "$fulldivid"
  """
  scene_setupjs = joinpath(mbjsdir, "mbscene_axes_setup.js") |> readall
  [Elem(:div; id=fulldivid, style=Dict(:height=>params[:height])),
   script_elem(divsetupjs, scene_setupjs)]
end

scene_from_template{T<: Real}(
    data_matrices::Vector{Matrix{T}}, template::AbstractString;
    divid=randstring(12), params=plotdefaults, reinit_scene=false) = begin
  params = merge(plotdefaults, params)
  divid = string(divid)
  data_assignments = ""
  for (i,data) in enumerate(data_matrices)
    tdata = data'
    nrows, ncols = size(tdata)
    data_assignments *= """
      var data$i = $(tdata |> vec |> json)
      var drows$i = $nrows
      var dcols$i = $ncols
    """
  end
  template_jsstr = joinpath(mbjsdir, template) |> readall
  fulldivid = "mathbox-div-"*divid
  pwelems = scene_setup_elem(divid, fulldivid, params)
  variable_assignments = """
$data_assignments
var divid = "$divid"
var mathbox = mbinstances[divid]
var view = mbinstances["view"+divid]
mbjlparams[divid] = $(params |> json)
"""
  script_contents = """
(function mbdiv$divid(){
  $variable_assignments
  $template_jsstr
})()
"""
  push!(pwelems, script_elem(script_contents))
  Elem(:div, pwelems)
end

bar3d{T <: Real}(data::Matrix{T}; divid=randstring(12), params=plotdefaults, reinit_scene=false) =
  scene_from_template(Matrix{T}[data], "mbbar3d_template.js"; divid=divid, params=params, reinit_scene=reinit_scene)

vec3d{T <: Real}(data::Matrix{T}; bases=zeros(data), divid=randstring(12), params=plotdefaults, reinit_scene=false) =
  scene_from_template(Matrix{T}[data, bases], "mbvec3d_template.js"; divid=divid, params=params, reinit_scene=reinit_scene)

surf{T<: Real}(data::Matrix{T}; divid=randstring(12), params=plotdefaults, reinit_scene=false) =
  scene_from_template(Matrix{T}[data], "mbsurf_template.js"; divid=divid, params=params, reinit_scene=reinit_scene)

end
