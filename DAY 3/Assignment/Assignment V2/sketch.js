let x, y;
let angle = 0;
let size = 50;

function setup() {
  createCanvas(400, 400);
  rectMode(CORNER);
  angleMode(DEGREES);
  frameRate(24);


}

function draw() {
  background(0);


  for (let i = 0; i < width; i = i + size) {
    for (let j = 0; j < height; j = j + size) {

      push();
      //noFill();
      //stroke(255);
      drawBlock(i, j, size, size);
      pop();
    }
  }
}



function drawBlock(x, y, size, size) {

  let distance = dist(mouseX, mouseY, width / 2, height / 2);

  translate()

  if (distance <= 30) {
    angle += 1;
  }
  rotate(angle);
  rect(x, y, size, size);

}