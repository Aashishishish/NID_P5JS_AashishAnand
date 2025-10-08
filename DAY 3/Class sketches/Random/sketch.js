function setup() {
  createCanvas(1700, 800);
  background(220);

}

function draw() {

}


function mousePressed() {
  let alien;
  alien = random(20, 160);

  drawAlien(mouseX, mouseY, alien);
}

function drawAlien(x, y, z) {


  fill(random(100, 250), random(100, 250), random(100, 250));
  noStroke();
  ellipse(x, y, 150 + z, 100 + z);
  fill(random(100, 250), random(100, 250), random(100, 250));
  ellipse(x, y, 100 + z, 200 + z);
  fill(random(100, 250), random(100, 250), random(100, 250));
  ellipse(x + 60, y + 20, z + 20, z);
  ellipse(x - 60, y + 20, z + 20, z);
  rect(x - 30, y + 100, 60, 5);

}