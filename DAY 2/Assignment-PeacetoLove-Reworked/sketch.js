let xPos1_1;
let xPos1_2;
let xPos1_3;
let xPos2_1;
let xPos2_2;
let xPos2_3;

function setup() {
  xPos1_1 = 200;
  xPos1_2 = 238;
  xPos1_3 = 162;

  xPos2_1 = 1000;
  xPos2_2 = 1038;
  xPos2_3 = 962;
  createCanvas(1200, 400);
  background(255);

}

function draw() {
  


}

function mouseMoved() {
  PeaceToLove();

}

function PeaceToLove() {


  //Left

  fill("#97CBE142")
  noStroke();
  ellipse(200, 100, frameCount % 150);
  ellipse(288, 150, frameCount % 150);
  ellipse(288, 250, frameCount % 150);
  ellipse(200, 300, frameCount % 150);
  ellipse(112, 250, frameCount % 150);
  ellipse(112, 150, frameCount % 150);


  fill("#72C2E430")
  noStroke();
  ellipse(200, 100, frameCount % 250);
  ellipse(288, 150, frameCount % 250);
  ellipse(288, 250, frameCount % 250);
  ellipse(200, 300, frameCount % 250);
  ellipse(112, 250, frameCount % 250);
  ellipse(112, 150, frameCount % 250);


  fill('#72C2E430');
  noStroke();
  ellipse(200, 100, frameCount % 100);
  ellipse(288, 150, frameCount % 100);
  ellipse(288, 250, frameCount % 100);
  ellipse(200, 300, frameCount % 100);
  ellipse(112, 250, frameCount % 100);
  ellipse(112, 150, frameCount % 100);


  //


  //Right 

  fill("#97CBE142")
  noStroke();
  ellipse(1000, 100, frameCount % 150);
  ellipse(1088, 150, frameCount % 150);
  ellipse(1088, 250, frameCount % 150);
  ellipse(1000, 300, frameCount % 150);
  ellipse(912, 250, frameCount % 150);
  ellipse(912, 150, frameCount % 150);


  fill("#72C2E430")
  noStroke();
  ellipse(1000, 100, frameCount % 250);
  ellipse(1088, 150, frameCount % 250);
  ellipse(1088, 250, frameCount % 250);
  ellipse(1000, 300, frameCount % 250);
  ellipse(912, 250, frameCount % 250);
  ellipse(912, 150, frameCount % 250);


  fill('#72C2E430')
  noStroke();
  ellipse(1000, 100, 100);
  ellipse(1088, 150, 100);
  ellipse(1088, 250, 100);
  ellipse(1000, 300, 100);
  ellipse(912, 250, 100);
  ellipse(912, 150, 100);






  //Central 


  fill("#97CBE130")
  noStroke();
  ellipse(600, 100, frameCount % 500);
  ellipse(688, 150, frameCount % 500);
  ellipse(688, 250, frameCount % 500);
  ellipse(600, 300, frameCount % 500);
  ellipse(512, 250, frameCount % 500);
  ellipse(512, 150, frameCount % 500);


  fill("#97CBE102")
  noStroke();
  ellipse(600, 100, 1000);
  ellipse(688, 150, 1000);
  ellipse(688, 250, 1000);
  ellipse(600, 300, 1000);
  ellipse(512, 250, 1000);
  ellipse(512, 150, 1000);



  fill("#3AA0CD26")
  noStroke();
  ellipse(600, 100, 600);
  ellipse(688, 150, 600);
  ellipse(688, 250, 600);
  ellipse(600, 300, 600);
  ellipse(512, 250, 600);
  ellipse(512, 150, 600);


  fill("#F443366D")
  noStroke();
  ellipse(600, 100, sin(frameCount / 500) * 1000);
  ellipse(688, 150, sin(frameCount / 500) * 1000);
  ellipse(688, 250, sin(frameCount / 500) * 1000);
  ellipse(600, 300, sin(frameCount / 500) * 1000);
  ellipse(512, 250, sin(frameCount / 500) * 1000);
  ellipse(512, 150, sin(frameCount / 500) * 1000);



  fill("#E91E6351")
  noStroke();
  ellipse(600, 100, sin(frameCount / 600) * 600);
  ellipse(688, 150, sin(frameCount / 600) * 600);
  ellipse(688, 250, sin(frameCount / 600) * 600);
  ellipse(600, 300, sin(frameCount / 600) * 600);
  ellipse(512, 250, sin(frameCount / 600) * 600);
  ellipse(512, 150, sin(frameCount / 600) * 600);



  fill('#72C2E430')
  noStroke();
  ellipse(600, 100, 100);
  ellipse(688, 150, 100);
  ellipse(688, 250, 100);
  ellipse(600, 300, 100);
  ellipse(512, 250, 100);
  ellipse(512, 150, 100);

  fill('#FFC10733')
  noStroke();
  ellipse(600, 155, 150);
  ellipse(638, 175, 150);
  ellipse(638, 225, 150);
  ellipse(600, 245, 150);
  ellipse(562, 225, 150);
  ellipse(562, 175, 150);

  fill('#FFC1070F')
  noStroke();
  ellipse(600, 155, 350);
  ellipse(638, 175, 350);
  ellipse(638, 225, 350);
  ellipse(600, 245, 350);
  ellipse(562, 225, 350);
  ellipse(562, 175, 350);


  ////LeftPinkHex

  fill('rgba(255,192,203,0.46)');
  noStroke();
  ellipse(xPos1_1, 155, 100);
  xPos1_1 = xPos1_1 + 0.1;
  if (xPos1_1 > 599) {
    xPos1_1 = 600;
  }
  ellipse(xPos1_2, 175, 100);
  xPos1_2 = xPos1_2 + 0.1;
  if (xPos1_2 > 637) {
    xPos1_2 = 638;
  }
  ellipse(xPos1_2, 225, 100);
  xPos1_2 = xPos1_2 + 0.1;
  if (xPos1_2 > 637) {
    xPos1_2 = 638;
  }

  ellipse(xPos1_1, 245, 100);
  xPos1_1 = xPos1_1 + 0.1;
  if (xPos1_1 > 599) {
    xPos1_1 = 600;
  }
  ellipse(xPos1_3, 225, 100);
  xPos1_3 = xPos1_3 + 0.1;
  if (xPos1_3 > 561) {
    xPos1_3 = 562;
  }


  ellipse(xPos1_3, 175, 100);
  xPos1_3 = xPos1_3 + 0.1;
  if (xPos1_3 > 561) {
    xPos1_3 = 562;
  }






  ////RightPinkHex

  fill('rgba(255,192,203,0.46)')
  noStroke();
  ellipse(xPos2_1, 155, 100);
  xPos2_1 = xPos2_1 - 0.1;
  if (xPos2_1 < 601) {
    xPos2_1 = 600;
  }
  ellipse(xPos2_2, 175, 100);
  xPos2_2 = xPos2_2 - 0.11;
  if (xPos2_2 < 639) {
    xPos2_2 = 638;
  }
  ellipse(xPos2_2, 225, 100);
  xPos2_2 = xPos2_2 - 0.1;
  if (xPos2_2 < 639) {
    xPos2_2 = 638;
  }
  ellipse(xPos2_1, 245, 100);
  xPos2_1 = xPos2_1 - 0.1;
  if (xPos2_1 < 601) {
    xPos2_1 = 600;
  }
  ellipse(xPos2_3, 225, 100);
  xPos2_3 = xPos2_3 - 0.1;
  if (xPos2_3 < 563) {
    xPos2_3 = 562;
  }
  ellipse(xPos2_3, 175, 100);
  xPos2_3 = xPos2_3 - 0.1;
  if (xPos2_3 < 563) {
    xPos2_3 = 562;
  }






}