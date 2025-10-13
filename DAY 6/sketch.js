let spriteImage, spritecow, spritec = [], sprites = [];
let bg, scenes;

let spriteX = 12, spriteY = 11;
let spriteA = 12, spriteB = 13;
let count = 0;
let count_ = 0;
let row = 0;
let row_ = 0;
let x = 0, y = 0;
let x_ = 0, y_ = 0;
let xdir = 0, ydir = 0;
let k, l, m;

function preload() {

  spriteImage = loadImage('images/Samurai_SpriteSheet_4.png');
  spritecow = loadImage('Images2/cow_left.png');
  bg = loadImage('Images2/bg.png')
  scenes = loadImage('Images2/scenes.png')
}

function setup() {
  createCanvas(1920, 1080);


  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;
  let u = spritecow.width / spriteA;
  let o = spritecow.height / spriteB;


  for (let i = 0; i < spriteY; i++) {

    sprites[i] = [];


    for (let j = 0; j < spriteX; j++) {

      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }
}


function draw() {
  background(31, 81, 255);
  noStroke();
  image(bg, 0, 0, 1920, 1080);
  image(scenes,0,0,1920,1080);



  // fill('red');
  // ellipse(1300, 150, 250, 250);


  image(sprites[row][count], 750, 800);
  if (frameCount % 5 == 0) {
    count = (count + 1) % spriteX;
    x = x + xdir;
    y = y + ydir;
  }


  image(spritec[row_][count_], 750, 384);
  if (frameCount % 5 == 0) {
    count_ = (count_ + 1) % spriteA;
    x_ = x_ + xdir;
    y_ = y_ + ydir;
  }
}

function keyPressed() {
  if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 3;
    xdir = 14;
    ydir = 0;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 4;
    xdir = -14;
    ydir = 0;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(17)) {
    row = 7;
    xdir = -20;
    ydir = 0;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(17)) {
    row = 6;
    xdir = 20;
    ydir = 0;
  } else if (keyCode == UP_ARROW) {
    row = 3;
    xdir = 0;
    ydir = 0;
  } else if (keyCode == DOWN_ARROW) {
    row = 5;
    xdir = 0;
    ydir = 0;
  } else if (keyCode == LEFT_ARROW) {
    row = 2;
    ydir = 0;
    xdir = -7;
  } else if (keyCode == RIGHT_ARROW) {
    row = 1;
    ydir = 0;
    xdir = 7;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(71)) {
    row = 8;
    ydir = 0;
    xdir = 0;
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(71)) {
    row = 9;
    ydir = 0;
    xdir = 0;
  }
}
function keyReleased() {
  row = 0;
  xdir = 0;
  ydir = 0;
  count = frameCount % 12;

}



