// --- GLOBAL VARIABLES ---
let gameState = "intro";
let xDirectionmovement = 0;
let xSpeed = 5;

let cowXdirectionmovement = 0;
let xcowSpeed = 10;
let cowStopped = false; // New state to track if the cow has reached its stop point
let cowControlled = false; // New state to track if the player is controlling the cow

const COW_WIDTH = 100;
const COW_HEIGHT = 25;
const PLAYER_SIZE = 50;
const ACTIVATION_DISTANCE = 200; // Max distance between player and cow to enable control

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  // Initialize player position
  xDirectionmovement = 50; 
  // Calculate the cow's final stopping position (right edge - cow width)
  // This value will be used in levelOne to check if the cow should stop.
  //const cowStopPos = width - COW_WIDTH;
}

function draw() {
  if(gameState === "intro"){
    introLevel();
  } else if (gameState === "level 1"){
    levelOne();
  } else if( gameState === "level 2"){ // Added opening bracket for consistency
    levelTwo();
  }
}

function introLevel(){
  fill("RED");
  rect(0, 0, width, height); // Use width/height
  fill(255);
  textSize(50);
  text("LEVEL INTRO", width/2, height/2);
  textSize(20);
  text("Press any key to start. Press 'G' near the cow to control it in Level 1.", width/2, height/2 + 70);
}

function levelOne(){
  // Y-position for the ground and entities
  const groundY = height / 2; 
  const playerY = groundY - PLAYER_SIZE;
  const cowY = groundY - COW_HEIGHT;
  
  // Draw Background
  fill(0, 255, 0, 100);
  rect(0, 0, width, height);
  
  // Draw Ground
  fill("black");
  rect(0, groundY, width, height/2);

  playerMovement();
  
  // Draw Player
  fill("ORANGE");
  rect(xDirectionmovement, playerY, PLAYER_SIZE, PLAYER_SIZE);

  // --- Cow Auto-Movement Logic ---
  if (cowControlled === false) {
    if (cowStopped === false) {
      // Auto-move right
      cowXdirectionmovement = cowXdirectionmovement + xcowSpeed;
    
      // Check for stop point (Cow's right edge reaches screen edge)
      if (cowXdirectionmovement >= width - COW_WIDTH) {
        cowXdirectionmovement = width - COW_WIDTH; // Snap to the edge
        cowStopped = true; // Set flag to stop movement
        xcowSpeed = 0; // Ensure speed is zero
      }
    }
  }

  // Draw Cow
  fill("PURPLE");
  rect(cowXdirectionmovement, cowY, COW_WIDTH, COW_HEIGHT);
  
  // Optional: Display instruction text if near the cow
  if (cowStopped === true) {
      let cowCenter = cowXdirectionmovement + COW_WIDTH / 2;
      let playerCenter = xDirectionmovement + PLAYER_SIZE / 2;
      let distance = dist(cowCenter, groundY, playerCenter, groundY);
      
      if (distance < ACTIVATION_DISTANCE) {
          fill(0);
          textSize(20);
          text("Press 'G' to control cow", width - 150, groundY - COW_HEIGHT - 30);
      }
  }
}

  // function levelTwo(){
  //   // Y-position for the ground and entities
  //   const groundY = height / 2; 
  //   const playerY = groundY - PLAYER_SIZE;
  //   const cowY = groundY - COW_HEIGHT;

  //   fill("WHITE");
  //   rect(0, 0, width, height);

  //   // Draw Ground
  //   fill("black");
  //   rect(0, groundY, width, height/2);

  //   playerMovement();
    
  //   // Draw Player
  //   fill("ORANGE");
  //   rect(xDirectionmovement, playerY, PLAYER_SIZE, PLAYER_SIZE);

  //   // --- Cow Auto-Movement (Moving Left) ---
  //   // The cow is still controlled by player movement in this function, 
  //   // as the cowControlled state persists unless reset.
    
  //   // Draw Cow
  //       // fill("PURPLE");
  //         //rect(cowXdirectionmovement, cowY, COW_WIDTH, COW_HEIGHT);
  // }

function keyPressed(){
  if(gameState === "intro"){
    gameState = "level 1";
  } else if(gameState === "level 1" && keyCode == 71){ // 💡 Press 'G' in Level 1
      
      let cowCenter = cowXdirectionmovement + COW_WIDTH / 2;
      let playerCenter = xDirectionmovement + PLAYER_SIZE / 2;
      let distance = dist(cowCenter, height/2, playerCenter, height/2); // Check distance
      
      // Check if the cow is stopped AND the player is close enough
      if (cowStopped === true && distance < ACTIVATION_DISTANCE) {
          cowControlled = true;
          xcowSpeed = xSpeed; // Match cow speed to player speed
      } else {
           // Original Level 2 transition kept for redundancy (optional)
           // gameState = "level 2";
      }
  }
}

function playerMovement(){
  // Used to store the direction of player input
  let direction = 0; 
    
  if(keyIsDown(RIGHT_ARROW)){
    xDirectionmovement = xDirectionmovement + xSpeed;
    direction = 1;
  } else if (keyIsDown(LEFT_ARROW)){
    xDirectionmovement = xDirectionmovement - xSpeed;
    direction = -1;
  }

  // --- Cow Movement Logic (After Player Input) ---
  if (cowControlled === true) {
      // Move the cow in the direction of player input
      cowXdirectionmovement = cowXdirectionmovement + (xcowSpeed * direction);
      
      // Boundary check to keep the cow on screen too (optional)
      if (cowXdirectionmovement < 0) {
          cowXdirectionmovement = 0;
      }
      if (cowXdirectionmovement > width - COW_WIDTH) {
          cowXdirectionmovement = width - COW_WIDTH;
      }
  }

  // Player Boundary and Level Transition Check
  // if (xDirectionmovement > width){
  //   gameState = "level 2";
  //   xDirectionmovement = 0; // Reset player position for new level
  //   cowControlled = false;  // Release cow control in the new level
  // }
   if (xDirectionmovement < 0) {
      xDirectionmovement = 0;
   }
}