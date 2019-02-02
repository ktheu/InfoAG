class Asteroid {

    constructor() {
        this.pos = createVector(random(width), random(height));
        this.v = createVector(random(-0.3, 0.3), random(-0.3, 0.3))
        this.winkel = 0;
        this.vWinkel = random(-3, 3);
    }

    act() {
        this.checkRand();
        this.move();
        this.display();
    }

    move() {
        this.pos.add(this.v);
        this.winkel = this.winkel + this.vWinkel;
    }

    display() {
        imageMode(CENTER);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.winkel));
        image(asteroidImg, 0, 0);
        pop();
    }

    checkRand() {
        let b2 = asteroidImg.width / 2;
        let h2 = asteroidImg.height / 2;
        if (this.pos.x - b2 > width) this.pos.x = -b2;
        if (this.pos.x + b2 < 0) this.pos.x = width + b2;
        if (this.pos.y - h2 > height) this.pos.y = -h2;
        if (this.pos.y + h2 < 0) this.pos.y = height + h2;
    }

    vanish() {
        this.pos = createVector(-100, 100);
        this.v = createVector(0, 0);
    }

}

