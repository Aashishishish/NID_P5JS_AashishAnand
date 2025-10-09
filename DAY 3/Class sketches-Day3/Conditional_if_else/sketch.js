function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {


}
function mouseClicked() {

  if (mouseY < height / 2) {
    fill("red");
    ellipse(mouseX, mouseY, 20);
  } else {
    fill("yellow");
    rect(mouseX, mouseY, 20, 60);
  }


}