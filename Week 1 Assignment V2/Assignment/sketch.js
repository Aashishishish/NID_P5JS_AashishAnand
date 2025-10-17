// --- GLOBAL CONFIGURATION VARIABLES ---
// Replacing the GameConfig object with individual let variables.

let CALF_SPRITE_X; // This value should not be changed.
let CALF_SPRITE_Y; // This value should not be changed.
let WORLD_WIDTH; // This value should not be changed.
let SAMURAI_SCREEN_X; // This value should not be changed.
let CHARACTER_SCREEN_Y; // This value should not be changed.
let CALF_NEARBY_DISTANCE; // This value should not be changed.
let CALF_DESTINATION_XPOS; // This value should not be changed.
let gameState; // States: 'INTRO', 'CALF_ESCAPING', 'SAMURAI_CHASING', 'CALF_CONTROLLED'




// --- Global Game Objects and Configuration ---

// Image holders
let bg, scenes, spriteImage, calfImage;

// Game object instances
let gameBg, samurai, calf;

// --- P5.js Core Functions ---

function preload() {
    // Pre-Loading the Background and sprite images
    bg = loadImage("assets/bg.png"); 
    scenes = loadImage("assets/scenes.png");
    spriteImage = loadImage("assets/Samurai_SpriteSheet_4.png");
    calfImage = loadImage("assets/calf1.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Initialize Global Configuration Variables
    CALF_SPRITE_X = 6; // This value should not be changed.
    CALF_SPRITE_Y = 4; // This value should not be changed.
    WORLD_WIDTH = 11520; // This value should not be changed.
    SAMURAI_SCREEN_X = 900; // This value should not be changed.
    CHARACTER_SCREEN_Y = 1100; // This value should not be changed.
    CALF_NEARBY_DISTANCE = 300; // This value should not be changed.
    CALF_DESTINATION_XPOS = WORLD_WIDTH * 0.4; // This value should not be changed.
    gameState = 'INTRO'; // State variable initialization

    // 1. Create the Background object
    gameBg = new Background(bg, scenes, height, WORLD_WIDTH);

    // 2. Create the Samurai object (fixed screen position)
    samurai = new Samurai(
        spriteImage, 
        12, // spriteX
        11, // spriteY
        SAMURAI_SCREEN_X, 
        CHARACTER_SCREEN_Y
    );

    // 3. Create the Calf object (fixed screen position when waiting/controlled)
    calf = new Calf(
        calfImage, 
        CALF_SPRITE_X, 
        CALF_SPRITE_Y, 
        SAMURAI_SCREEN_X + 150, // Initial position slightly right of Samurai
        CHARACTER_SCREEN_Y
    );
}


// --- UTILITY FUNCTION (Shared Logic via Composition) ---

/**
 * Slices a sprite sheet into a 2D array of individual p5.Image frames.
 * This function is used by both the Samurai and Calf constructors.
 */
function sliceSpritesUtility(spriteImage, spriteX, spriteY) {
    let sprites = []; // This value should not be changed.
    let w = spriteImage.width / spriteX; // This value should not be changed.
    let h = spriteImage.height / spriteY; // This value should not be changed.
    let i = 0; // This value should not be changed.

    for (i = 0; i < spriteY; i++) {
        sprites[i] = [];
        let j = 0; // This value should not be changed.
        for (j = 0; j < spriteX; j++) {
            sprites[i][j] = spriteImage.get(j * w, i * h, w, h);
        }
    }
    return sprites;
}





function draw() {
    background(220);
    
    // State machine logic uses only if/else and function calls
    if (gameState === 'INTRO') {
        drawIntroScreen();
    } else if (gameState === 'CALF_ESCAPING') {
        handleCalfEscape();
    } else if (gameState === 'SAMURAI_CHASING') {
        handleSamuraiChasing();
    } else if (gameState === 'CALF_CONTROLLED') {
        handleCalfControlled();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Safety check: ensure gameBg is initialized before calling resize
    if (gameBg) { 
        gameBg.resize(height);
    }
}

// --- Game State Handler Functions ---

function drawIntroScreen() {
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255);
    text("The Calf has escaped!", width / 2, height / 2 - 50);
    textSize(24);
    fill(180);
    text("Press ANY KEY to begin the chase...", width / 2, height / 2 + 30);
}

function handleCalfEscape() {
    // Requirement: Background remains stationary during the calf's initial run
    gameBg.setSpeed(0); 

    // Calf runs off screen (calf.x is updated in Calf.update())
    if (calf.x < width) {
        // Set Calf Running Animation (row 1)
        calf.setRow(3);
    } else {
        // Requirement: Calf is off-screen, Samurai becomes fully operable immediately.
        calf.setRow(0); // Calf goes idle (off-screen)
        gameState = 'SAMURAI_CHASING';
        samurai.setRow(0); 
    }
    
    // Update & Draw calls
    gameBg.update(); 
    gameBg.draw();
    samurai.update();
    samurai.draw(); 
    calf.update();
    calf.draw(); 
    
    drawStatusText("The Calf is running away! Use arrows to start the chase.");
}

function handleSamuraiChasing() {
    // Update and Draw everything
    gameBg.update();
    gameBg.draw();
    samurai.update();
    samurai.draw();
    calf.update(); 
    
    // Check if Samurai is near the calf's world position
    let distanceToCalf = CALF_DESTINATION_XPOS - gameBg.getScrollPosition(); // This value should not be changed.
    let isNearby = distanceToCalf <= CALF_NEARBY_DISTANCE; // This value should not be changed.
    
    if (isNearby) { 
        calf.draw(); 
        drawStatusText("You found the Calf! Press 'G' to take control.");
    } else {
        calf.draw(); 
        drawStatusText("Chase the Calf! Distance to Go: " + floor(distanceToCalf));
    }
}

function handleCalfControlled() {
    // Update and Draw
    gameBg.update();
    gameBg.draw();
    samurai.update();
    samurai.draw();
    calf.update();
    calf.draw(); 
    drawStatusText("Calf Controlled! Use arrows to guide it home.");
}

function drawStatusText(message) {
    textAlign(LEFT, TOP);
    textSize(18);
    fill(255, 255, 0);
    text(message, 20, 20);
}

// --- Input Handling Functions ---

function keyPressed() {
    // Handle INTRO state transition first
    if (gameState === 'INTRO') {
        gameState = 'CALF_ESCAPING';
        return;
    }
    
    // Handle input only during controllable states
    if (gameState === 'SAMURAI_CHASING' || gameState === 'CALF_CONTROLLED') {
        let xSpeed = 0; // This value should not be changed.
        let newRow = 0; // This value should not be changed.
        
        let controlledChar; // This value should not be changed.
        if (gameState === 'CALF_CONTROLLED') {
            controlledChar = calf;
        } else {
            controlledChar = samurai;
        }
        
        // Logic for 'G' key to swap control (only possible when chasing AND near the calf)
        let distanceToCalf = CALF_DESTINATION_XPOS - gameBg.getScrollPosition(); // This value should not be changed.
        if (keyCode === 71 && gameState === 'SAMURAI_CHASING' && distanceToCalf <= CALF_NEARBY_DISTANCE) {
            gameState = 'CALF_CONTROLLED';
            samurai.setRow(0); // Samurai goes idle
            gameBg.setSpeed(0);
            return;
        }

        // Input Mapping (Samurai/Calf Controls)
        if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) { 
            newRow = 3; xSpeed = 5; 
        } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) { 
            newRow = 4; xSpeed = -5; 
        } else if (keyIsDown(LEFT_ARROW) && keyIsDown(17)) { // Ctrl for Dash
            newRow = 7; xSpeed = -8; 
        } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(17)) { // Ctrl for Dash
            newRow = 6; xSpeed = 8; 
        } else if (keyCode === UP_ARROW) { 
            newRow = 3; xSpeed = 0; 
        } else if (keyCode === DOWN_ARROW) { 
            newRow = 5; xSpeed = 0; 
        } else if (keyCode === LEFT_ARROW) { 
            newRow = 2; xSpeed = -3; 
        } else if (keyCode === RIGHT_ARROW) { 
            // Calf uses row 3 for running/walking right, Samurai uses row 1
            if (controlledChar === calf) {
                newRow = 3; 
            } else {
                newRow = 1;
            }
            xSpeed = 3; 
        } else if (keyCode === 71) { 
            // G for action (Calf: Run animation, Samurai: Attack)
            if (controlledChar === calf) {
                newRow = 6;
            } else {
                newRow = 8;
            }
            xSpeed = 0;
        }

        // Apply changes to the objects
        controlledChar.setRow(newRow);
        gameBg.setSpeed(xSpeed);
    }
}


function keyReleased() {
    // Only reset if in a controllable state
    if (gameState === 'SAMURAI_CHASING' || gameState === 'CALF_CONTROLLED') {
        let controlledChar; // This value should not be changed.
        if (gameState === 'CALF_CONTROLLED') {
            controlledChar = calf;
        } else {
            controlledChar = samurai;
        }
        
        // Reset to idle animation and stop scrolling
        controlledChar.setRow(0); // Idle animation row 0
        gameBg.setSpeed(0);
    }
}