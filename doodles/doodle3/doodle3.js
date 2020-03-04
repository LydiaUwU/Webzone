let boxes; let width; let height; let countX; let countY; let spacing;

function setup() {
    width = windowWidth;
    height = windowHeight;
    createCanvas(width, height);
    rectMode(CENTER);

    boxes = [];

    countX = 4;
    countY = 4;
    spacing = 200;
    let startX = calcStartX();
    let startY = calcStartY();
    for (let i = 0; i < countY; i++) {
        for (let j = 0; j < countX; j++) {
            boxes.push(new Box(startX, startY, j, i,10, spacing))
        }
    }
}

function draw() {
    background(0);
    for (let i = 0; i < countX; i++) {
        for (let j = 0; j < countY; j++) {
            let index = (i * countX) + j;
            boxes[index].update();
            fill(255, 0, 0);
            circle(boxes[index].xpos, boxes[index].ypos, boxes[index].size);
            stroke(255, 0, 0);
            strokeWeight(3);
            if (j < countY - 1) {
                let nextIndex = index + 1;
                line(boxes[index].xpos, boxes[index].ypos, boxes[nextIndex].xpos, boxes[nextIndex].ypos);
            }
            if (i < countX - 1) {
                let nextIndex = ((i + 1) * countX) + j;
                line(boxes[index].xpos, boxes[index].ypos, boxes[nextIndex].xpos, boxes[nextIndex].ypos);
            }
        }
    }
}

function windowResized() {
    width = windowWidth;
    height = windowHeight;
    resizeCanvas(width, height);

    let startX = calcStartX();
    let startY = calcStartY();
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].move(startX, startY);
    }
}

function calcStartX() {
    return (width / 2) - ((countX * spacing) / 2) + spacing;
}

function calcStartY() {
    return (height / 2) - ((countY * spacing) / 2) + spacing;
}

class Box {
    constructor(startX, startY, xIndex, yIndex, size, spacing) {
        this.startX = startX;
        this.startY = startY;
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.size = size;
        this.spacing = spacing;

        this.t = 0;
    }

    move(startX, startY) {
        this.startX = startX;
        this.startY = startY;
    }

    update() {
        this.xpos = this.startX + (this.xIndex * this.spacing) + (50 * Math.sin((this.t + (this.yIndex * 90)) / 50)) - (this.spacing / 2);
        this.ypos = this.startY + (this.yIndex * this.spacing) + (50 * Math.cos((this.t + (this.xIndex * 90)) / 50)) - (this.spacing / 2);
        this.t ++;
    }
}