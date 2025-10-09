let size = 50;

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(12);


}

function draw() {
  background(255);


  for (let i = size / 2; i < height; i = i + size) {

    for (let j = 0; j < width; j = j + size) {
      fill(random(0,55),random(56,100),random(101,255),random(0,50));
      //noFill();
      strokeWeight(random(i*0.001));
      ellipse(j + mouseX / 2, i, mouseX, mouseY);

    }

  }

}
