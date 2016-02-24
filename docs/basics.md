# Mathbox.jl

## Quick Start

    heights = rand(30, 30)
    #create a 3d bar plot, using heights as the heights
    bar3d(heights)

    #create a 3d surface plot, using heights as the heights
    surf(heights)

    #= create a 3d vector plot, using heads as the 3D positions of the heads of the vectors, and bases as the bases (if bases is omitted the
    origin will be used for the bases of all vectors) =#
    bases = rand(10,10,10)
    heads = rand(10,10,10)
    bar3d(heads; bases=bases)

## Usage

This package will henceforth be referred to as mb.jl, to differentiate it from the javascript library that it interfaces with: Mathbox.js

Mathbox.js is essentially a wrapper around Three.js a library supporting WebGL (GPU accelerated 3d graphics in the web browser).

To create a three.js scene you need:
1. some lights which illuminate...
2. some objects in the scene (usually represented by vertices of polygonal faces) that are viewed by...
3. a camera, which has an orientation and looking in a particular direction


Mathbox.js automatically handles lighting, and allows you to specify the (vertices of) objects in your scene using data and or data generating functions. It also provides a simple interface to set up the camera.

#### Data

I suppose you should be using it like this:

mb = Mathbox()
data!(mb, me_data; id=next_dataid())

now the Mathbox instance will have:
* basedata::Dict(::Symbol, AbstractArray) #mappings from data-id to the data
* dtransform::Function(::AbstractArray) -> ::AbstractArray # function that transforms the base data into the low level data (vertices etc). E.g. for a 3d bar plot would take a height, and get the (default) bar bases and create vertices for cuboids.
* viz::Dict(::Symbol, Any) #mappings from various property names to their visualisation parameters including:
  * type: :face, :surface, vector
* 


#### Camera

mb.jl sets up the camera automatically for high level visualisation functions like 3d vector, surface and bar plots. An interface will be exposed to modify the camera position in future releases.


What
