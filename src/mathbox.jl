module Mathbox

export bar3d, surf
using JSON, Patchwork

const mbjsdir = joinpath(dirname(Base.source_path()), "js")
const mbjs = joinpath(mbjsdir, "mathbox-bundle.js") |> readall
const scene_is_setup = Dict{AbstractString, Any}() #AbstractString because maybe someone will want a Unicode divid one day
__init__() = begin
  try
      display("text/html", """<script charset="utf-8" >
        $(mbjs)
        var mbinstances = {}
        var mbjlparams = {}
      </script>""")
      Patchwork.load_js_runtime()
      println("mathbox js probably loaded")
  catch
  end
end

plotdefaults = Dict(:height=>"500px", :wigglefactor=>0.0)

scene_setup_elem(divid, fulldivid, params) = begin
  divsetupjs = """
  var divid = "$divid"
  var fulldivid = "$fulldivid"
  """
  [Elem(:div) & Dict(:id=>fulldivid, :style=>Dict(:height=>params[:height]));
  Elem(:script, divsetupjs*(joinpath(mbjsdir, "mbscene_axes_setup.js") |> readall)) & Dict(:type=>"text/javascript", :charset=>"utf-8")]
end

scene_from_template{T<: Real}(data::Matrix{T}, template::AbstractString; divid=randstring(12), params=plotdefaults, reinit_scene=false) = begin
  params = merge(plotdefaults, params)
  divid = string(divid)
  tdata = data'
  nrows, ncols = size(tdata)
  template_jsstr = joinpath(mbjsdir, template) |> readall
  fulldivid = "mathbox-div-"*divid
  pwelems = scene_setup_elem(divid, fulldivid, params)
  variable_assignments = """
    var divid = "$divid"
    var mathbox = mbinstances[divid]
    var view = mbinstances["view"+divid]
    mbjlparams[divid] = $(params |> json)
    var dattaboy = $(tdata |> vec |> json)
    var drows = $nrows
    var dcols = $ncols
  """
  script_contents = """
    (function mbdiv$divid(){
      $variable_assignments
      $template_jsstr
    })()
  """
  push!(pwelems, Elem(:script, script_contents) & Dict(:type=>"text/javascript", :charset=>"utf-8", :id=>randstring(12)))
  Elem(:div, pwelems)
end

bar3d{T<: Real}(data::Matrix{T}; divid=randstring(12), params=plotdefaults, reinit_scene=false) =
  scene_from_template(data, "mb3dbar_template.js"; divid=divid, params=params, reinit_scene=reinit_scene)

surf{T<: Real}(data::Matrix{T}; divid=randstring(12), params=plotdefaults, reinit_scene=false) =
  scene_from_template(data, "mbsurf_template.js"; divid=divid, params=params, reinit_scene=reinit_scene)

end
