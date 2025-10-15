class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;

  }

  show() {
    fill(255,0,0);
    rect(this.x, this.y, this.width, this.height);
  }

  moveUp() {

    if (this.y > 0) {
      this.y -= this.speed;
    }
  }

  moveDown() {

    if (this.y < height - this.height) {
      this.y += this.speed;
    }
  }

}