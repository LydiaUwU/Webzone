// Apologies to VTF
// https://www.velvetyne.fr/

let font, battery;

// FOR DEBUG PURPOSES!
let t;

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(0);

    font = loadFont('Assets/Mister Pixel Regular.otf');
    textFont(font);
    textSize(30);

    battery = new Battery(createVector(50, 70));

    // FOR DEBUG PURPOSES!
    t = 0;
}

function draw() {
    fill(255, 0, 0);
    text("Test", 50, 50);

    battery.draw();

    if (t % 10 === 0) {
        battery.drainCharge();
    }

    // FOR DEBUG PURPOSES!
    t++;
}

function windowResized() {

}

//TODO: Remove these when finalising the project.
setup();
draw();
windowResized();