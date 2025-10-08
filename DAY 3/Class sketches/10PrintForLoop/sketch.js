let size = 50;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {

  for (let i = 0; i < width; i = i + 50) {
    ellipse(i + size / 2, 200, size);
    ellipse(200, i + size / 2, size);
  }

}
