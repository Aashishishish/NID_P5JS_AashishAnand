let bwoll;
let lPaddle;
let rPaddle;
let player1=0;
let player2=0;
let sounds=[];

function preload(){

}

function setup() {
  createCanvas(800, 400);

  let pWidth = 10, pHeight = 80;
  bwoll = new Ball(width / 2, height / 2, 5, 5);
  lPaddle = new Paddle(0, height / 2 - pHeight / 2, pWidth, pHeight, 10);
  rPaddle = new Paddle(width - pWidth, height / 2 - pHeight / 2, pWidth, pHeight, 10);



}

function draw() {
  background(0, 0, 200, 100);
  noStroke();

  //Ball Behaviour


  bwoll.move();
  bwoll.checkCollisionPaddle(lPaddle);
  bwoll.checkCollisionWall();
  bwoll.checkCollisionPaddle(rPaddle);
  bwoll.show();




  let point = bwoll.checkWinner();
  if (point == 1) {
    player1++;
    bwoll.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  } else if (point == 2) {
    player2++;
    bwoll.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  }



  //Paddle Behaviour

  lPaddle.show();
  rPaddle.show();

  //if keys UP and DOWN are pressed, move the right paddle
  if (keyIsDown(UP_ARROW)) {
    rPaddle.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    rPaddle.moveDown();
  }
  //if keys W and S are pressed, move the left paddle
  if (keyIsDown(87)) {
    lPaddle.moveUp();
  } else if (keyIsDown(83)) {
    lPaddle.moveDown();
  }
}
