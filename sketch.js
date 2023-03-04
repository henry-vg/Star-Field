const stars = [],
  numStars = 500;

let speed;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < numStars; i++) {
    stars.push(new starObject());
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  speed = 15;
  speed = map(mouseX, 0, width, 0, 15);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

class starObject {
  update() {
    if (!this.x) {
      this.create();
    }
    this.z -= speed;

    this.curX = map(this.x / this.z, 0, 1, 0, width);
    this.curY = map(this.y / this.z, 0, 1, 0, height);
    this.perspective = map(this.z, 0, width, this.size, 0);

    if (this.z < 1 || this.curX <= -width / 2 - this.perspective || this.curX >= width / 2 + this.perspective || this.curY <= -height / 2 - this.perspective || this.curY >= height / 2 + this.perspective) {
      this.create();
    }
  }

  create() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.size = random(5, 15);
    if (this.z) {
      this.z = width;
    }
    else {
      this.z = random(width);
    }
  }

  show() {
    fill(255);
    noStroke();

    ellipse(this.curX, this.curY, this.perspective);
  }
}