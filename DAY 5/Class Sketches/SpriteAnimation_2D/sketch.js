let spriteImage, sprites = [];
let spriteX = 12, spriteY = 11;
let count = 0;
let row = 0;
let x = 0, y = 0;
let xdir = 0, ydir = 0;
let k, l, m;

function preload() {
  //load the full sprite image
  spriteImage = loadImage('images/Samurai_SpriteSheet_4.png');
}

function setup() {
  createCanvas(innerWidth, 128);
  //break the sprite image into individual images and store it into a 2D array (Note - 2D array is basically where each element fo the arrat is another array)
  // w -> width of each individual image
  // h -> height of each individual image
  let w = spriteImage.width / spriteX;
  let h = spriteImage.height / spriteY;

  //loop through the 4 rows
  for (let i = 0; i < spriteY; i++) {
    //create an empty array for each row
    sprites[i] = [];

    //within each row, loop through the columns
    for (let j = 0; j < spriteX; j++) {
      // store the images in the 2D array
      sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
    }
  }

}

function draw() {
  background('cyan');
  //draw the appropriate image from the array based on the row selected (check keyPressed) and the x and y position
  image(sprites[row][count], x, y);
  if (frameCount % 5 == 0 ) {
    count = (count + 1) % spriteX;
    x = x + xdir;
    y = y + ydir;
  }
  //  else{
  //   keyReleased(0,0,0,frameCount%12);
  //   }
}
//  else {
//   idleanim(0,frameCount%12);
//  }
//else{
//     image(sprites[0][frameCount%12]);
//   }
// }
// function mousePressed(){
//     row = 8;
//     ydir = 0;
//     xdir = 0;
//     }

function keyPressed() {
  //read the appropriate row based on the key direction
  if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 3; // select the right row
    xdir = 14; //make sure the sprite doesnt move along x axis
    ydir = 0; //make sprite move up
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    row = 4; // select the right row
    xdir = -14; //make sure the sprite doesnt move along x axis
    ydir = 0; //make sprite move up
  } else if (keyIsDown(LEFT_ARROW) && keyIsDown(17)) {
    row = 7; // select the right row
    xdir = -14; //make sure the sprite doesnt move along x axis
    ydir = 0; //make sprite move up
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(17)) {
    row = 6; // select the right row
    xdir = 14; //make sure the sprite doesnt move along x axis
    ydir = 0; //make sprite move up
  } else if (keyCode == UP_ARROW) {
    row = 3; // select the right row
    xdir = 0; //make sure the sprite doesnt move along x axis
    ydir = 0;
  } else if (keyCode == DOWN_ARROW) {
    row = 5;
    xdir = 0; //make sure the sprite doesnt move along x axis
    ydir = 0; //make sprite move down
  } else if (keyCode == LEFT_ARROW) {
    row = 2;
    ydir = 0; //make sure the sprite doesnt move along y axis
    xdir = -7; //make sprite move left
  } else if (keyCode == RIGHT_ARROW) {
    row = 1;
    ydir = 0; //make sure the sprite doesnt move along y axis
    xdir = 7; //make sprite move left
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
  count=frameCount%12;

}



// function idleanim(k,l){
//   image(sprites[k][l]);
// }





