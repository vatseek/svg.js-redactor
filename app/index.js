const SVG = require('svg.js');
const draw = SVG('drawing');
draw.rect(100,100).animate().fill('#f03').move(100,100)