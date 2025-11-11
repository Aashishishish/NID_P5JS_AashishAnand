// --- Global Variables for Game State ---
let currentAct = 1;

// --- Act 1 Variables ---
let act1Images = [];
let totalImages = 13;
let currentImageIndex = 0;

// --- Transition Variables ---
let fadeAlpha = 0; 

// --- Act 2 Variables ---
let act2Background;
let carImage;
let bgScrollX = 0; 
let carX = 50; 
let carY; 
let carSpeed = 6;

// --- Act 3 Variables ---
let act3_location;
let act3_visualImages = [];
let act3_totalImages = 4;
let act3_imageIndex = 0;
let act3_carX;
let act3_pauseTimer = 0;
let act3State = "fadingIn"; 

// --- Act 4 Variables ---
let act4_background;
let fireworkSheet;
let fireworkSound;
let fireworks = []; // Array to hold all firework objects
let act4State = "fadingIn";
let act4_startTime = 0;

// --- ‼️ TWEAK THESE for your sprite sheet ---
let fireworkFrameWidth = 240;  // Width of a *single* frame
let fireworkFrameHeight = 250; // Height of a *single* frame
let fireworkTotalFrames = 11; // Total number of frames in the sheet
let fireworkAnimationSpeed = 0.1; // How fast to play (lower is slower)
// ---------------------------------------------

// --- 1. Preload Function ---
function preload() {
  // Load Act 1
  for (let i = 1; i <= totalImages; i++) {
    let filename = 'assets/A1_' + nf(i, 2) + '.png'; 
    act1Images.push(loadImage(filename));
  }
  
  // Load Act 2
  act2Background = loadImage('assets/act2_background.png');
  carImage = loadImage('assets/car.png');

  // Load Act 3
  act3_location = loadImage('assets/act3_location.png');
  for (let i = 1; i <= act3_totalImages; i++) {
    let filename = 'assets/A3_' + nf(i, 2) + '.png';
    act3_visualImages.push(loadImage(filename));
  }
  
  // Load Act 4
  act4_background = loadImage('assets/act4_background.png');
  fireworkSheet = loadImage('assets/firework_sheet.png');
  fireworkSound = loadSound('assets/fireworks_sound.mp3');
  
  console.log("Preload complete.");
}

// --- 2. Setup Function ---
function setup() {
  createCanvas(1920, 1080);
  console.log('Setup complete.');
  
  // Act 2 Setup
  carY = 697; 
  
  // Act 3 Setup
  act3_carX = - (carImage.width || 883); 
  
  // Act 4 Setup
  textAlign(CENTER, CENTER);
  textSize(64);
}

// --- 3. Main Draw Function (The "Router") ---
function draw() {
  if (currentAct === 1) {
    drawAct1();
  } else if (currentAct === 1.5) {
    drawTransitionToAct2();
  } else if (currentAct === 2) {
    drawAct2();
  } else if (currentAct === 3) {
    drawAct3();
  } else if (currentAct === 4) {
    drawAct4();
  }
}

// --- 4. Mouse Clicked Event (The "Router") ---
function mouseClicked() {
  if (currentAct === 1) {
    handleAct1Click();
  } else if (currentAct === 3) {
    handleAct3Click();
  }
}

// --- 5. Key Pressed Event (NEW) ---
function keyPressed() {
  // Check for ESC key
  if (keyCode === ESCAPE && currentAct === 4) {
    // Check we're not in the middle of a fade
    if (act4State === "playing" || act4State === "delay") {
      act4State = "endScreen";
      fireworkSound.stop(); // Stop the looping sound
      console.log("Ending game.");
    }
  }
}

// --- 6. Act-Specific Functions ---

/**
 * Draws Act 1 (Visual Novel)
 */
function drawAct1() {
  let currentImage = act1Images[currentImageIndex];
  if (currentImage && currentImage.width > 0) {
    image(currentImage, 0, 0);
  }
}

/**
 * Handles the fading black screen transition to Act 2.
 */
function drawTransitionToAct2() {
  drawAct1(); 
  fadeAlpha += 5; 
  fill(0, min(fadeAlpha, 255));
  noStroke();
  rect(0, 0, width, height);
  if (fadeAlpha >= 255) { currentAct = 2; }
}

/**
 * Draws Act 2 (Scrolling Car Scene)
 */
function drawAct2() {
  if (!act2Background || !carImage) { return; }

  // Handle Input & Update Logic
  if (keyIsDown(RIGHT_ARROW)) {
    let carWidth = carImage.width || 883;
    let midScreen = (width / 2) - (carWidth / 2); 
    let maxScroll = act2Background.width - width; 

    // Phase 1, 2, 3 logic...
    if (carX < midScreen) {
      carX += carSpeed;
      if (carX > midScreen) { carX = midScreen; }
    } else if (bgScrollX < maxScroll) {
      bgScrollX += carSpeed;
      if (bgScrollX > maxScroll) { bgScrollX = maxScroll; }
    } else {
      carX += carSpeed;
    }
  }

  // Draw the Scene
  copy(act2Background, bgScrollX, 0, width, height, 0, 0, width, height);
  image(carImage, carX, carY);

  // Check for End of Act
  if (carX > width) {
    currentAct = 3;
    fadeAlpha = 255; 
    act3State = "fadingIn"; 
    act3_carX = - (carImage.width || 883); 
  }
}

/**
 * Draws Act 3 (Riverside Scene)
 */
function drawAct3() {
  // State 1: Fading IN
  if (act3State === "fadingIn") {
    image(act3_location, 0, 0);
    image(carImage, act3_carX, carY);
    fadeAlpha -= 5; 
    fill(0, max(fadeAlpha, 0));
    noStroke();
    rect(0, 0, width, height);
    if (fadeAlpha <= 0) { act3State = "carMoving"; }
  }
  // State 2: Car Auto-Moving
  else if (act3State === "carMoving") {
    image(act3_location, 0, 0);
    act3_carX += carSpeed;
    image(carImage, act3_carX, carY);
    let targetX = (width / 3) * 2;
    if (act3_carX >= targetX) {
      act3_carX = targetX; 
      act3State = "carPaused"; 
      act3_pauseTimer = millis(); 
    }
  }
  // State 3: Car Paused
  else if (act3State === "carPaused") {
    image(act3_location, 0, 0);
    image(carImage, act3_carX, carY);
    if (millis() - act3_pauseTimer > 3000) {
      act3State = "fadingOut"; 
      fadeAlpha = 0; 
    }
  }
  // State 4: Fading OUT
  else if (act3State === "fadingOut") {
    image(act3_location, 0, 0);
    image(carImage, act3_carX, carY); 
    fadeAlpha += 5; 
    fill(0, min(fadeAlpha, 255));
    noStroke();
    rect(0, 0, width, height);
    if (fadeAlpha >= 255) { act3State = "visualNovel"; }
  }
  // State 5: Visual Novel
  else if (act3State === "visualNovel") {
    let currentImage = act3_visualImages[act3_imageIndex];
    if (currentImage && currentImage.width > 0) {
      image(currentImage, 0, 0);
    }
  }
}

/**
 * Draws Act 4 (Fireworks Scene)
 * --- THIS IS THE UPDATED FUNCTION ---
 */
function drawAct4() {
  // State 1: Fading IN
  if (act4State === "fadingIn") {
    image(act4_background, 0, 0);
    
    fadeAlpha -= 5; // Fade *out* the black
    fill(0, max(fadeAlpha, 0));
    noStroke();
    rect(0, 0, width, height);
    
    if (fadeAlpha <= 0) {
      act4State = "delay";
      act4_startTime = millis(); // Start 1.5s timer
    }
  }
  // State 2: 1.5s Delay
  else if (act4State === "delay") {
    image(act4_background, 0, 0);
    
    // Wait 1.5 seconds
    if (millis() - act4_startTime > 1500) {
      act4State = "playing";
      fireworkSound.loop(); // Start the sound
    }
  }
  // State 3: Fireworks Playing
  else if (act4State === "playing") {
    image(act4_background, 0, 0);
    
    // --- Spawn new fireworks randomly (UPDATED) ---
    // 2% chance per frame to spawn one
    if (random(1) < 0.01) {
      // Spawn in the right 2/3 of the screen's width
      let x = random(width / 3, width); 
      // --- THIS IS THE UPDATED LINE ---
      // Spawn in the top 1/5 of the screen's height
      let y = random(height / 5); 
      fireworks.push(new Firework(x, y));
    }
    
    // --- Update and display all fireworks ---
    // Loop backwards to safely remove items
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].display();
      // Remove if animation is done
      if (fireworks[i].isDone) {
        fireworks.splice(i, 1);
      }
    }
  }
  // State 4: End Screen
  else if (act4State === "endScreen") {
    background(0); // Black screen
    fill(255);
    text("The End", width / 2, height / 2);
  }
}

/**
 * Handles all mouse clicks for Act 1.
 */
function handleAct1Click() {
  if (mouseX > width / 2) {
    if (currentImageIndex < totalImages - 1) {
      currentImageIndex++;
    } else {
      currentAct = 1.5;
      fadeAlpha = 0;
    }
  } 
  else if (mouseX < width / 2) {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    }
  }
}

/**
 * Handles all mouse clicks for Act 3.
 */
function handleAct3Click() {
  if (act3State !== "visualNovel") {
    return;
  }
  
  if (mouseX > width / 2) {
    if (act3_imageIndex < act3_totalImages - 1) {
      act3_imageIndex++;
    } else {
      // --- START ACT 4 ---
      console.log("End of Act 3. Starting Act 4.");
      currentAct = 4;
      act4State = "fadingIn";
      fadeAlpha = 255; // Set up for fade *in*
    }
  } 
  else if (mouseX < width / 2) {
    if (act3_imageIndex > 0) {
      act3_imageIndex--;
    }
  }
}

// --- 7. Firework Class (NEW) ---
// This object manages a single firework animation

class Firework {
  constructor(x, y) {
    this.x = x; // x-position
    this.y = y; // y-position
    // Start at the *last* frame for reverse animation
    this.currentFrame = fireworkTotalFrames - 1; 
    this.animationSpeed = fireworkAnimationSpeed;
    this.isDone = false;
  }

  // Update the animation
  update() {
    // Go backwards
    this.currentFrame -= this.animationSpeed;
    if (this.currentFrame < 0) {
      this.isDone = true;
    }
  }

  // Draw the firework
  display() {
    // Get the integer part of the frame number
    let frame = floor(this.currentFrame);
    
    // Calculate the x-position of the frame on the sprite sheet
    // (Assuming a horizontal 1D sheet)
    let sx = frame * fireworkFrameWidth;
    
    // Draw the correct frame from the sheet
    copy(
      fireworkSheet,  // The source image
      sx, 0,          // Source x, y (top-left corner of frame)
      fireworkFrameWidth, fireworkFrameHeight, // Source w, h
      this.x, this.y,  // Destination x, y
      fireworkFrameWidth, fireworkFrameHeight  // Destination w, h
    );
  }
}