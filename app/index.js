const SVG = require('svg.js');
require('svg.draggable.js');
require('svg.select.js');
require('svg.resize.js');
const draw = SVG('drawing').size(500, 500);
draw.attr({fill: '#f06'}).rect(50, 50).draggable();