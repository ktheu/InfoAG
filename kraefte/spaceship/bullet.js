class Bullet {

    constructor() {
        this.pos = createVector(0, 0);
        this.v = createVector(0, 0);
    }

    act() {
        this.move();
        this.display();
    }

    move() {
        this.pos.add(this.v);
    }

    display() {
        imageMode(CENTER);
        image(bulletImg, this.pos.x, this.pos.y);
    }

    hits(a) {
        return this.pos.dist(a.pos) < 30;
    }

    vanished() {
        let linksdraussen = this.pos.x < 0;
        let rechtsdraussen = this.pos.x > width;
        let obendraussen = this.pos.y < 0;
        let untendraussen = this.pos.y > height;
        return linksdraussen || rechtsdraussen || obendraussen || untendraussen;
    }

    vanish() {
        this.pos = createVector(-100, -100);
        this.v = createVector(0, 0);
    }

}