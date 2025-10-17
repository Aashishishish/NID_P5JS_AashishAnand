let gameState = "intro";
let xDirectionmovement=0;
let xSpeed = 5;

let cowXdirectionmovement = 0;
let xcowSpeed = 10;  





function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if(gameState === "intro"){
    introLevel()
  } else if (gameState === "level 1"){

    levelOne();
    
  } else if( gameState === "level 2")
    levelTwo();
}

function introLevel(){
  fill("RED");
  rect(0,0,windowWidth,windowHeight);
}

function levelOne(){

  
  
  fill(0,255,0,100)
  rect(0,0,width,height);

   //my ground plane 
  fill("black")
  rect(0,height/2,width,height/2)

  playerMovement();
  //my char 
  fill("ORANGE")
  rect(xDirectionmovement,windowHeight/2-50,50,50)

  //cowauto speed

  //cow sprite
  cowXdirectionmovement = cowXdirectionmovement+xcowSpeed;
  if(cowXdirectionmovement>width){
    cowXdirectionmovement = width-100;
    xcowSpeed=0
  }

  fill("PURPLE");
  rect(cowXdirectionmovement,windowHeight/2-25,100,25)

}

function levelTwo(){
  fill("WHITE")
  rect(0,0,width,height);

   //my ground plane 
  fill("black")
  rect(0,height/2,width,height/2)

  playerMovement();
  //my char 
  fill("ORANGE")
  rect(xDirectionmovement,windowHeight/2-50,50,50)

  //cowauto speed

  //cow sprite
  cowXdirectionmovement = cowXdirectionmovement-xcowSpeed;
  

  fill("PURPLE");
  rect(cowXdirectionmovement,windowHeight/2-25,100,25)
}

function keyPressed(){
  if(gameState === "intro"){
    gameState = "level 1"
  } else if(keyCode == 71){
    gameState = "level 2"
  }
}

function playerMovement(){

   if(keyIsDown(RIGHT_ARROW)){
    xDirectionmovement= xDirectionmovement+xSpeed
  } else if (keyIsDown(LEFT_ARROW)){
    xDirectionmovement=xDirectionmovement-xSpeed
  }



}
