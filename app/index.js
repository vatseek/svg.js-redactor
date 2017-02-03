const Raphael = require('raphael');
require('Raphael.FreeTransform');
require('mouse');

class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.gridSize = 20  ;
    }

    drawGrid(paper, grid) {
        const startX = Math.round(this.x / this.gridSize) * this.gridSize;
        const startY = Math.round(this.y / this.gridSize) * this.gridSize;
        for (let i = startX; i < this.w; i += this.gridSize) {
            if (i % 100) {
                grid.push(paper.path(`M${i} ${this.y}L${i} ${this.h}`).attr("stroke", "#3d8bcf"));
            } else {
                grid.push(paper.path(`M${i} ${this.y}L${i} ${this.h}`).attr("stroke", "#4c95d5"));
            }
        }
        for (let j = startY; j < this.h; j+= this.gridSize) {
            if (j % 100) {
                grid.push(paper.path(`M${this.x} ${j}L${this.w} ${j}`).attr("stroke", "#3d8bcf"));
            } else {
                grid.push(paper.path(`M${this.x} ${j}L${this.w} ${j}`).attr("stroke", "#4c95d5"));
            }
        }
    }
}

init = function() {
    const view = document.getElementById('drawing');
    if (!view) {
        console.error('Invalid view id');
        return;
    }

    const rect = view.getBoundingClientRect();

    let width = Math.abs(rect.right - rect.left);
    let height = Math.abs(rect.bottom - rect.top);
    let zoom = 1;
    const paper = Raphael(rect.left, rect.top, width, height);

    let zoomHeigth = height  * zoom;
    let zoomWidth = width * zoom;
    let offsetX = 0;
    let offsetY = 0;

    let grid = paper.set();
    let selectList = paper.set();
    new Rect(offsetX, offsetY, zoomWidth, zoomHeigth).drawGrid(paper, grid);


    // mouse.on('wheel', (e) => {
    //     e.stopPropagation();
    //     const delta = parseInt(e.deltaY);
    //     if (delta && paper) {
    //         const x = parseInt(e.clientX);
    //         const y = parseInt(e.clientY);
    //         zoom += (delta * (0.01));
    //         if (zoom < 0) {
    //             zoom = 0;
    //             return;
    //         }
    //         zoomX = x - ((x / width ) * zoomWidth);
    //         zoomY = y - ((y / height) * zoomHeigth);
    //         zoomHeigth = height  * zoom;
    //         zoomWidth = width * zoom;
    //
    //         // TODO: calc add previous offset coordinates
    //         paper.setViewBox(offsetY, offsetX, zoomWidth, zoomHeigth);
    //     }
    // });

    // mouse.on('drag', (e) => {
    //     const target = e.target;
    //     if (target.tagName != 'svg') {
    //         return;
    //     }
    //     offsetX = offsetX - e.movementY;
    //     offsetY = offsetY - e.movementX;
    //     paper.setViewBox(offsetY, offsetX, zoomWidth, zoomHeigth);
    // });

    let select = null;
    mouse.on('click', (e) => {
        const target = e.target;
        if (target.tagName == 'svg' && select) {
            select.unplug();
            select = null;
            selectList.clear();
        }
    });

    const clickItem = function(e) {
        e.preventDefault();
        let found = false;
        const target = this;
        if (selectList.length > 0) {
            selectList.forEach((item) => {
                if (item == target) {
                    found = true;
                }
            })
        }
        if (found) {
            return;
        }

        selectList.push(target);
        if (select) {
            select.unplug();
            select = null;
        }
        select = paper.freeTransform(selectList, {
            draw: [ 'bbox' ],
            // snap: { drag: 40 },
            // snapDist: { drag: 7 }
        });
    };

    const circle = paper.circle(200, 200, 100);
    circle.attr("fill", "#f00");
    circle.attr("stroke", "#fff");
    circle.click(clickItem);

    // selectList.push(circle);

    const circle2 = paper.circle(400, 200, 50);
    circle2.attr("fill", "#f00");
    circle2.attr("stroke", "#fff");
    circle2.click(clickItem);

    window.paper = paper;
};