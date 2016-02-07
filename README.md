# Mathbox.jl

A crude and limited high level interface to the [Mathbox](https://gitgud.io/unconed/mathbox) JavaScript library by Steven Wittens

Currently vaguely supports:

* 3D bar chart
  * `bar3d(data::Matrix)`
* 3D surface plot
  * `surf(data::Matrix)`
* 3D vector plot
  * `vec3d(heads::Matrix; bases=zeros(heads))`


###### Note this package is very young and has only, barely, been tested in IJulia, bugs are likely to come thick and fast, so you've been warned :) New issues and pull requests welcome though.


## Installation

    Pkg.clone("https://github.com/JobJob/Mathbox.jl")

## Usage

Example Jupyter notebook(s) in `examples/` folder
