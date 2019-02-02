class SpaceShip {
    constructor() {
        this.pos = createVector(width / 4, height / 2);
        this.v = createVector(0, 0);
        this.a = createVector(0, 0);
        this.winkel = 0;

    }

    act() {
        this.checkTasten();
        this.move();
        this.checkRand();
        this.display();
    }

    move() {
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
    }

    applyForce(force) {
        this.a.add(force);
    }

    checkTasten() {
        if (tRight) {
            this.winkel += winkelgeschwindigkeitSpaceship;
        }
        if (tLeft) {
            this.winkel -= winkelgeschwindigkeitSpaceship;
        }
        if (tSpace && !tSpacelock) {
            bullets.push(this.fire());
            tSpacelock = true;
        }
    }

    checkRand() {
        let laenge = spaceShipImg1.width;
        let hoehe = spaceShipImg1.height;
        if (this.pos.x > width) this.pos.x = -laenge;
        if (this.pos.x + laenge < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = -hoehe;
        if (this.pos.y + hoehe < 0) this.pos.y = height;
    }

    display() {
        imageMode(CENTER);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.winkel));
        if (tUp) {
            image(spaceShipImg2, 0, 0);
        } else {
            image(spaceShipImg1, 0, 0);
        }
        pop();
    }

    fire() {
        let b = new Bullet();
        b.v = p5.Vector.fromAngle(radians(this.winkel));
        b.v.setMag(spaceShipImg1.width / 2);
        b.pos = p5.Vector.add(this.pos, b.v);
        b.v.setMag(bulletSpeed);
        return b;
    }
}

