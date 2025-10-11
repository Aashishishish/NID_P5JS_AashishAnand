let spriteImage, sprites = [];
let spriteX = 12, spriteY = 11;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;
let k, l, m;

function preload() {

  spriteImage = loadImage('images/Samurai_SpriteSheet_4.png');
}

function setup() {
  createCanvas(innerWidth, innerHeight);


  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;


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

  fill(167, 199, 231,50);
  triangle(300, 300, 0, 512, 1000,700);

  fill(167, 199, 231,50);
  triangle(300, 300, 230, 350, 388,350);

  fill('red');
  ellipse(1300, 150, 250,250);

  fill(50, 100, 255);
  triangle(1000, 50, 300, 512, 1900,512);

  fill(167, 199, 231,60);
  triangle(1000, 50, 800, 182, 1257,182);
  
  fill(14, 14, 14);
  rect(0, 512, innerWidth, 300);

  image(sprites[row][count], x, 384);
  if (frameCount % 5 == 0) {
    count = (count + 1) % spriteX;
    x = x + xdir;
    y = y + ydir;
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



