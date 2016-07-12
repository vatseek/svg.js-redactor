const SVG = require('svg.js');
require('svg.draggable.js');
require('svg.select.js');
require('svg.resize.js');
const draw = SVG('drawing').size('100%', '100%');
const rect = draw.rect(50, 50).selectize({svg_select_points_b:true}).resize();
rect.fill('#f06');