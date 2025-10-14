//Background variables
let bg, bgnew, xPos = 0;
let scenes, scenesnew;

//Samurai Variables
let spriteImage, sprites = [];
let spriteX = 12, spriteY = 11;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;

// Calf Variables
let calfImage, calf = [];
let calfX = 6, calfY = 8;
let countC = 0;
let rowC = 0;
let n = 0, o = 0;
let ndir = 0, odir = 0;

// tint variables
let a = 0;
let b = 0;

function preload() {

  //Pre-Loading the Background and sprite images

  bg = loadImage("images/bg.png");
  scenes = loadImage("images/scenes.png");
  spriteImage = loadImage('images/Samurai_SpriteSheet_4.png');
  calfImage = loadImage("images/calf1.png");
}

function setup() {
  colorMode(HSB);
  createCanvas(innerWidth, innerHeight);

  //Setting the Background

  bg.resize(11520, innerHeight);
  scenes.resize(11520, innerHeight);

  //Samurai Sprite Read

  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;

  //Calf Sprite Read

  let c = calfImage.width / calfX;
  let b = calfImage.height / calfY;

  //Defining Samurai sprite

  for (let i = 0; i < spriteY; i++) {

    sprites[i] = [];


    for (let j = 0; j < spriteX; j++) {

      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }

  //Defining Calf Sprite

  for (let k = 0; k < calfX; k++) {

    sprites[k] = [];


    for (let l = 0; l < calfY; l++) {

      sprites[k][l] = calfImage.get(l * c, k * b, c, b);
    }
  }
}

function draw() {
  // background(220);

  //Background Movement Controls
  // tint(255,0+a*2,frameCount/1);
  // a=a+0.07;
  bgnew = bg.get(xPos, 0, width, height);
  image(bgnew, 0, 0);
  scenesnew = scenes.get(xPos, 0, width, height);
  image(scenesnew, 0, 0);

  // BG 

  if (keyIsPressed) {
    xPos += xSpeed;
  }

  //Calling the Samurai Sprite

  image(sprites[row][count], 1000, 900);
  if (frameCount % 5 == 0) {
    count = (count + 1) % spriteX;
    x = x + xdir;
    y = y + ydir;
  }
  // fill(255-a*2,0,0,frameCount/3000);
  // a=a+0.07;
  // rect(0,0,innerWidth,innerHeight);

  // Calling calf Sprite
  image(calf[rowC][countC],1000,900);
  if (frameCount % 5 == 0) {
    countC = (countC + 1) % calfX;
    n = n+ndir;
    o = o+odir;
  }
}

function keyPressed() {

  //Samurai & BG movement through input

  if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 3;
    xdir = 0;
    ydir = 0;
    xSpeed = 5;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 4;
    xdir = 0;
    ydir = 0;
    xSpeed = -5;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(17)) {
    row = 7;
    xdir = 0;
    ydir = 0;
    xSpeed = xSpeed - 3;
    // rowC = 2;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(17)) {
    row = 6;
    xdir = 0;
    ydir = 0;
    xSpeed = xSpeed + 3;
    // rowC = 3;
  } else if (keyCode == UP_ARROW) {
    row = 3;
    xdir = 0;
    ydir = 0;
    xSpeed = 0;
  } else if (keyCode == DOWN_ARROW) {
    row = 5;
    xdir = 0;
    ydir = 0;
    xSpeed = 0;
  } else if (keyCode == LEFT_ARROW) {
    row = 2;
    ydir = 0;
    xdir = 0;
    xSpeed = -3;
    rowC = 2;
  } else if (keyCode == RIGHT_ARROW) {
    row = 1;
    ydir = 0;
    xdir = 0;
    xSpeed = 3;
    rowC = 3;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(71)) {
    row = 8;
    ydir = 0;
    xdir = 0;
    xSpeed = 0;

  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(71)) {
    row = 9;
    ydir = 0;
    xdir = 0;
    xSpeed = 0;
  }
}

function keyReleased() {
  row = 0;
  xdir = 0;
  ydir = 0;
  rowC = 0;
  count = frameCount % 12;

}


