-- Pandoc Lua filter: strip-ids.lua
-- Removes header identifiers and any classes/attributes so anchors like {#...}
-- generated from reStructuredText explicit targets are not present in output.

-- Header elements have an attribute table: {identifier, classes, keyvals}
function Header(h)
  h.attr = { "", {}, {} }
  return h
end
