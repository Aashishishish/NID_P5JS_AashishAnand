
let size = 100;
let i0, i1, i2, i3;

function preload() {
  i0 = loadImage("images/i0.jpg");
  i1 = loadImage("images/i1.jpg");
  i2 = loadImage("images/i2.jpg");
  i3 = loadImage("images/i3.jpg");
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(1);
}


function draw() {
  background(220);

  for (let i = 0; i < width; i = i + size) {
    for (let j = 0; j < height; j = j + size) {

      let choice = floor(random(0, 4));

      if (choice == 0) {
        image(i0, i, j);

      }

      else if (choice == 1) {
        image(i1, i, j);
      }

      else if (choice == 2) {
        image(i2, i, j);

      }
      else {
        image(i3, i, j);

      }



    }

  }
}