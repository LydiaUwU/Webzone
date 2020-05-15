// Made by Lydia MacBride for Radd.
// Sbeve is literally just vibing.

let sbeveDefault; let sbeveDizzy; let sbeveHappy; let sbeve; let starField; let hWidth; let hHeight; let mouseHeld; let origin;

function preload() {
    sbeveDefault = loadImage('sbeveDefault.png');
    sbeveDizzy = loadImage('sbeveDizzy.png');
    sbeveHappy = loadImage('sbeveHappy.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    smooth(4);

    hWidth = width / 2;
    hHeight = height / 2;

    noStroke();

    sbeve = new Sbeve();
    starField = new StarField(Math.min((width * height) / 9000, 300));
    mouseHeld = false;

    origin = createVector(0, 0);
}

function draw() {
    translate(width / 2, height / 2);
    background(0);

    starField.draw();
    sbeve.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    hWidth = width / 2;
    hHeight = height / 2;
}

function mousePressed() {
    mouseHeld = true;
}

function mouseReleased() {
    mouseHeld = false;
}

class Sbeve {
    pos; size; momentum; lastPos; targetPos; clicked; friction; t;

    constructor() {
        this.pos = createVector(0, 0);
        this.size = createVector(sbeveDefault.width, sbeveDefault.height);
        this.momentum = createVector(0, 0);
        this.lastPos = createVector(0, 0);
        this.targetPos = createVector(0, 0);
        this.clicked = false;
        this.friction = 0.98; // Yeah there's no friction in a vacuum but it looks weird without it.
        this.t = 0;
    }

    draw() {
        if (mouseHeld && mouseX - hWidth > this.pos.x - (this.size.x / 2) && mouseX - hWidth < this.pos.x + (this.size.x / 2)
            && mouseY - hHeight > this.pos.y - (this.size.y / 2) && mouseY - hHeight < this.pos.y + (this.size.y / 2)) {
            this.clicked = true;
        }

        if (this.clicked) {
            this.pos.lerp(mouseX - hWidth, mouseY - hHeight, 0, 0.2);
            this.momentum.set(this.pos.x - this.lastPos.x, this.pos.y - this.lastPos.y);
            this.lastPos.set(this.pos);
        }
        else {
            this.pos.add(this.momentum);
            let lerpSpeed = (this.pos.mag() > 50) ? 0.01 : 0.003;

            if (this.momentum.mag() < 0.1) {
                this.pos.lerp(this.targetPos, lerpSpeed);
            }

            if (this.t >= 100) {
                this.generateTargetPos();
                this.t = 0;
            }

            this.t++;
        }

        if (this.clicked) {
            this.clicked = mouseHeld;
        }

        if (this.clicked) {
            image(sbeveDizzy, this.pos.x - (this.size.x / 2), this.pos.y - (this.size.y / 2), this.size.x, this.size.y);
        }
        else if (this.pos.mag() > 50) {
            image(sbeveDefault, this.pos.x - (this.size.x / 2), this.pos.y - (this.size.y / 2), this.size.x, this.size.y);
        }
        else {
            image(sbeveHappy, this.pos.x - (this.size.x / 2), this.pos.y - (this.size.y / 2), this.size.x, this.size.y);
        }

        this.momentum.mult(this.friction);
    }

    generateTargetPos() {
        let xDir = (Math.random() < 0.5) ? -1 : 1;
        let yDir = (Math.random() < 0.5) ? -1 : 1;
        this.targetPos.set(xDir * Math.random() * 30, yDir * Math.random() * 30);
    }
}

class StarField {
    stars;

    constructor(count) {
        this.stars = [];

        for (let i = 0 ; i <= count; i++) {
             this.stars.push(new Star);
        }
    }

    draw() {
        for (let i of this.stars) {
            i.draw();
        }
    }
}

class Star {
    pos; size; speed; t;

    constructor() {
        this.initialise();
        this.size = 5;
        this.speed = 1.001;
    }

    draw() {
        this.pos.mult(this.speed);

        fill(Math.min(this.t, 255));
        circle(this.pos.x, this.pos.y, this.size);

        if (this.pos.x < -hWidth || this.pos.y < -hHeight || this.pos.x > hWidth || this.pos.y > hHeight) {
            this.initialise();
        }

        this.t++;
    }

    initialise() {
        let xDir = (Math.random() < 0.5) ? -1 : 1;
        let yDir = (Math.random() < 0.5) ? -1 : 1;
        this.pos = createVector(xDir * Math.random() * hWidth, yDir * Math.random() * hHeight);
        this.t = 0;
    }
}