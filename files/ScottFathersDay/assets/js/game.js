const SPACING = 50;
const START_X = -200;
const START_Y = -200;
const MIN_SCALE = 0.5;
const MAX_SCALE = 1.5;
const GROWTH_SPEED = 0.2;
const ROTATION_SPEED = 400;

let images = [];

let config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 2000,
        height: 2000
    },
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload ()
{
    this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
}

function create ()
{
    //  Create a stack of random cards

    let frames = this.textures.get('cards').getFrameNames();

    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            let scale = MIN_SCALE;
            let image = this.add.image(0, 0, 'cards', Phaser.Math.RND.pick(frames)).setInteractive();
            image.setScale(scale);

            image.x = START_X + (i * (image.width + SPACING));
            image.y = START_Y + (j * (image.height + SPACING));

            image.setData({
                hovered: false,
                scale: MIN_SCALE,
                startX: image.x,
                startY: image.y,
                distance: Phaser.Math.Distance.Between(image.x, image.y, config.scale.width / 2, config.scale.height / 2),
                angle: Phaser.Math.Angle.Between(image.x, image.y, config.scale.width / 2, config.scale.height / 2)
            });

            image.on('pointerover', function (event) {
                image.setData('hovered',  true);
            });

            image.on('pointerout', function (event) {
                image.setData('hovered',  false);
            });

            images.push(image);
        }
    }
}

let t = 0;

function update() {
    for (let i of images) {
        if (i.getData('hovered')) {
            i.setData('scale', Phaser.Math.Clamp(i.getData('scale') + GROWTH_SPEED, MIN_SCALE, MAX_SCALE));
            i.setScale(i.getData('scale'));
        }
        else {
            i.setData('scale', Phaser.Math.Clamp(i.getData('scale') - GROWTH_SPEED, MIN_SCALE, MAX_SCALE));
            i.setScale(i.getData('scale'));
        }

        i.x = (config.scale.width / 2) + i.getData('distance') * Math.sin(i.getData('angle') + (t / ROTATION_SPEED));
        i.y = (config.scale.height / 2) + i.getData('distance') * Math.cos(i.getData('angle') + (t / ROTATION_SPEED));
    }

    t++;
}