let noPetals = 10;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  frameRate(24);
}

function draw() {

  background(0);
  drawFlower(10, 100, 300);
  drawFlower(10, 200, 400);
  drawFlower(10, 80,80);

}



function drawFlower(petals, x, y) {
  push();

  translate(x, y);

  ellipse(0, 0, 60, 60);
  rotate(frameCount);


  for (let i = 0; i < noPetals; i++) {
    
    noStroke();
    fill(100, 255, 255, 100);
    ellipse(80, 0, 100, 50);
    rotate(360 / noPetals);

  }

  pop();

}







