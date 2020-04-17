class Battery {
    position; size; maxCharge; charge; spacing;

    constructor(position) {
        this.position = position;
        this.size = createVector(100, 35);

        this.maxCharge = this.charge = 100;
    }

    draw() {
        noStroke();

        // Trace outline of battery
        fill(255, 0, 0);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        rect(this.position.x + this.size.x, this.position.y + 9, 8, 17);

        fill(0);
        rect(this.position.x + 5, this.position.y + 5, this.size.x - 10, this.size.y - 10);

        // Draw segments of battery
        fill(255, 0, 0);

        let segmentCount = Math.ceil(this.charge / 20);
        let segmentPos = createVector(this.position.x + 10, this.position.y + 10);
        let segmentSize = createVector((this.size.x - 40) / 5, this.size.y - 20);
        let segmentOffset = segmentSize.x + 5;

        for (let i = 0; i < segmentCount; i++) {
            rect(segmentPos.x + (i * segmentOffset), segmentPos.y, segmentSize.x, segmentSize.y);
        }
    }

    drainCharge() {
        this.charge = Math.max(this.charge - 1, 0);
    }

    getCharge() { return this.charge; }
}