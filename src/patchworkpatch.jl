#special casing script tags so that they get removed and re-added on a change
#this ensures any js updates get run. We need this for Interact to work.
println(STDERR, "Overwriting Patchwork's diff!(Elem{ns, tag}, Elem{ns, tag}, Any Any) - you can ignore the warning below.\n")

import Patchwork: Patch, DictDiff, Overwrite, diff!

function diff!{ns, tag}(a::Elem{ns, tag}, b::Elem{ns, tag}, index, patches)
    if a === b return patches end

    patch = get(patches, index, Patch[])

    proppatch = Patchwork.diff(properties(a), properties(b))
    if !is(proppatch, nothing)
        patch = push!(patch, DictDiff(proppatch))
    end

    if tag == :script && ns == :xhtml
        scriptpatch = Dict()
        diff!(a.children, b.children, 0, scriptpatch)
        if !isempty(scriptpatch)
            return patches[index] = Overwrite(b)
        end
    else
        diff!(a.children, b.children, index, patches, parentpatch=patch)
    end

    if !isempty(patch)
        patches[index] = patch
    end
end
