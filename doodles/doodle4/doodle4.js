let cells; let cellSize; let mousePress; let xWidth; let yWidth; let paused; let t; let interval;

function setup() {
    createCanvas(windowWidth, windowHeight);
    initCells();

    t = 0;
    interval = 2;
    paused = true;
}

function draw() {
    background(0);

    if (!paused && t % interval === 0) {
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                let neighbourCount = 0;

                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        let checkX = mod((i + k), xWidth);
                        let checkY = mod((j + l), yWidth);

                        if (!(k === 0 && l === 0) && cells[checkX][checkY].alive) {
                            neighbourCount++;
                        }
                    }
                }
                cells[i][j].setNeighbours(neighbourCount);
            }
        }

        for (let i of cells) {
            for (let j of i) {
                j.checkLife();
            }
        }
    }

    for (let i of cells) {
        for (let j of i) {
            j.draw();
        }
    }

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

function mousePressed() {
    mousePress = true;
}

function mouseReleased() {
    mousePress = false;

    for (let i of cells) {
        for (let j of i) {
            j.resetClick();
        }
    }
}

document.body.onkeypress = function(e){
    if(e.keyCode === 32){
        paused = !paused;
    }
}

class Cell {
    alive;

    constructor(xIndex, yIndex, size) {
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.size = size;

        this.xpos = this.xIndex * this.size;
        this.ypos = this.yIndex * this.size;

        this.alive = false;
        this.clicked = false;
    }

    draw() {
        this.checkClick();
        stroke(38, 38, 38);

        if (this.alive) {
            fill(255, 0, 0);
        }
        else {
            fill(0);
        }
        let halfSize = this.size / 2;
        circle(this.xpos + halfSize, this.ypos + halfSize, halfSize);
    }

    checkClick() {
        if (mousePress && !this.clicked
            && mouseX > this.xpos && mouseX < this.xpos + this.size
            && mouseY > this.ypos && mouseY < this.ypos + this.size) {
            this.alive = !this.alive;
            this.clicked = true;
        }
    }

    resetClick() {
        this.clicked = false;
    }

    setNeighbours(neighbours) {
        this.neighbours = neighbours;
    }

    checkLife() {
        if (this.alive && (this.neighbours < 2 || this.neighbours > 3)) {
            this.alive = false;
        }
        else if (!this.alive && this.neighbours === 3) {
            this.alive = true;
        }
    }
}