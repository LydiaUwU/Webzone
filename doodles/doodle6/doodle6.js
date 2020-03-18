//Shoutouts to Max Cooper!

let initCell;

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(0);
    stroke(255, 0, 0);
    frameRate(15);

    initCell = new Cell(0, 0, 0, windowWidth, windowHeight, true);
}

function draw() {
    background(0);
    initCell.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    initCell = new Cell(0, 0, 0, windowWidth, windowHeight, true);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.max(min, Math.floor(Math.random() * (max - min)) + min); //The maximum is exclusive and the minimum is inclusive
}

class Cell {
    depth; xpos; ypos; width; height; type; children;

    constructor(depth, xpos, ypos, width, height, type) {
        this.depth = depth;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.type = type; //type = TRUE: vertical. False: horizontal

        this.children = [];

        if (this.depth <= 1) {
            this.segment();
        }
    }

    draw() {
        rect(this.xpos, this.ypos, this.width, this.height);

        if (getRandomInt(0, 100 / this.depth) === 0) {
            this.regen();
        }

        if (this.children.length > 0) {
            for (let i of this.children) {
                i.draw();
            }
        }
    }

    segment() {
        let segmentCount = getRandomInt(2, 10 - this.depth);

        if (this.type) {
            let segmentWidth = this.width / segmentCount;

            for (let i = 0; i < segmentCount; i++) {
                this.children.push(new Cell(this.depth + 1, this.xpos + (i * segmentWidth), this.ypos, segmentWidth, this.height, !this.type))
            }
        }
        else {
            let segmentHeight = this.height / segmentCount;

            for (let i = 0; i < segmentCount; i++) {
                this.children.push(new Cell(this.depth + 1, this.xpos, this.ypos + (i * segmentHeight), this.width, segmentHeight, !this.type))
            }
        }
    }

    regen() {
        if (this.depth <= 8) {
            this.children = [];
            this.segment();
        }
    }
}