let cells; let cellSize; let xWidth; let yWidth; let paused; let t; let interval;

function setup() {
    createCanvas(windowWidth, windowHeight);
    initCells();

    t = 0;
    interval = 2;
    paused = true;
}

function draw() {
    background(0);

    for (let i of cells) {
        for (let j of i) {
            j.draw();
        }
    }

    let randX = Math.floor(Math.random() * xWidth);
    let randY = Math.floor(Math.random() * yWidth);
    cells[randX][randY].flip();

    t++;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    initCells();
}

function initCells() {
    cellSize = 30;
    xWidth = Math.floor(windowWidth / cellSize) + 1;
    yWidth = Math.floor(windowHeight / cellSize) + 1;

    cells = new Array(xWidth);

    for (let i = 0; i < cells.length; i++) {
        cells[i] = new Array(yWidth);

        for (let j = 0; j < cells.length; j++) {
            cells[i][j] = new Cell(i, j, cellSize);
        }
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

class Cell {
    alive;

    constructor(xIndex, yIndex, size) {
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.size = size;

        this.xpos = this.xIndex * this.size;
        this.ypos = this.yIndex * this.size;

        this.type = Math.round(Math.random());
    }

    draw() {
        stroke(255, 0, 0);

        if (this.type === 0) {
            line(this.xpos, this.ypos, this.xpos + this.size, this.ypos + this.size);
        }
        else {
            line(this.xpos + this.size, this.ypos, this.xpos, this.ypos + this.size);
        }
    }

    flip() {
        this.type = (this.type === 0) ? 1 : 0;
    }
}