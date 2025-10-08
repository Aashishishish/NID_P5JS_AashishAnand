function setup() {
  createCanvas(500, 1000);
  background(255)
  

}

function draw() {
  fill(mouseX/2,mouseY/2,mouseX/4+mouseY/4);
  noStroke();
  ellipse(mouseX,mouseY,50,50);
  
  fill(mouseX/5,mouseY/5,mouseX/4+mouseY/4);
  noStroke();
  ellipse(mouseX,mouseY,30,30);


}
