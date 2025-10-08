let size = 50;

function setup() {
  createCanvas(innerWidth, innerHeight);


}

function draw() {
  background(220);


  for (let i = size/2; i < height; i = i + size) {

    for (let j = 0; j < width; j = j + size) {
      ellipse(j + size / 2,i, size);

    }

  }

}
