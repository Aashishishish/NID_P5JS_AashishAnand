function setup() {
  createCanvas(1000, 1000);
  background(220);

}

function draw(){
  function mousePressed(){
  let randomNo;
  randomNo = random(20,50);
  drawFlower(mouseX, mouseY);
  }
}

function mousePressed(){
  let petalSize;
  petalSize=random(20,50);

  drawFlower(mouseX, mouseY, petalSize);  
}

function drawFlower(x,y){


  fill(random(100,250),0,0)
  noStroke();
  ellipse(x,y-petal/2,petal);
  ellipse(x,y+petal/2,petal);
  ellipse(x-petal/2,y,petal);
  ellipse(x+petal/2,petal);
  ellipse(x,y-50,100);

  fill ("yellow")
  ellipse(x,y,petal)
  
}