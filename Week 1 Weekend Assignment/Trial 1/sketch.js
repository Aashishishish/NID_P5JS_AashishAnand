
// Calf Variables
let calfImage, calf = [];
let calfX = 6, calfY = 4;
let countC = 0;
let rowC = 0;
let n = 0, o = 0;
let ndir = 0, odir = 0;


function preload() {

  //Pre-Loading the Background and sprite images

  calfImage = loadImage("images/calf1.png");
}

function setup() {


  createCanvas(innerWidth, innerHeight);



  //Calf Sprite Read

  let c = calfImage.width / calfX;
  let b = calfImage.height / calfY;


  //Defining Calf Sprite

  for (let k = 0; k < calfY; k++) {

    calf[k] = [];


    for (let l = 0; l < calfX; l++) {

      calf[k][l] = calfImage.get(l * c, k * b, 1000, 1000);
    }
  }
}

function draw() {
  background(220);



  // Calling calf Sprite
  image(calf[rowC][countC], 300,300);
  if (frameCount % 5 == 0) {
    countC = (countC + 1) % calfX;
  }
}

function keyPressed() {


if (keyCode == LEFT_ARROW) {

    xSpeed = -3;
    rowC = 2;
  } else if (keyCode == RIGHT_ARROW) {

    xSpeed = 3;
    rowC = 3;
  } 
}

function keyReleased() {

  rowC = 0;
  countC = frameCount % 12;

}


