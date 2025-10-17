let CALF_SPRITE_X; // This value should not be changed.
let CALF_SPRITE_Y; // This value should not be changed.
let WORLD_WIDTH; // This value should not be changed.
let SAMURAI_SCREEN_X; // This value should not be changed.
let CHARACTER_SCREEN_Y; // This value should not be changed.
let CALF_SCREEN_Y; // This value should not be changed.
let CALF_NEARBY_DISTANCE; // This value should not be changed.
let CALF_DESTINATION_XPOS; // This value should not be changed.
let gameState; // States: 'INTRO', 'CALF_ESCAPING', 'SAMURAI_CHASING', 'CALF_CONTROLLED'

// --- Global Variables for Background Aspect Ratio (Based on Placeholder Image 11520x1080) ---
let BG_ORIGINAL_WIDTH; // This value should not be changed.
let BG_ORIGINAL_HEIGHT; // This value should not be changed.

// --- Global Game Objects and Image Holders ---

let bg, scenes, spriteImage, calfImage; // Image holders
let gameBg, samurai, calf; // Game object instances



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


function preload() {
    
  bg = loadImage("assets/bg.png");
    scenes = loadImage("assets/scenes.png");
    spriteImage = loadImage("assets/Samurai_SpriteSheet_4.png");
    calfImage = loadImage("assets/calf1.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Initialization of Global Configuration Variables
    CALF_SPRITE_X = 6; // This value should not be changed.
    CALF_SPRITE_Y = 4; // This value should not be changed.
    BG_ORIGINAL_WIDTH = 11520; // This value should not be changed.
    BG_ORIGINAL_HEIGHT = 1080; // This value should not be changed.
    
    WORLD_WIDTH = 11520; // This value should not be changed.
    SAMURAI_SCREEN_X = 700; // This value should not be changed.
    CHARACTER_SCREEN_Y = 560; // This value should not be changed.
    CALF_SCREEN_Y = 645; // This value should not be changed.
    CALF_NEARBY_DISTANCE = 300; // This value should not be changed.
    CALF_DESTINATION_XPOS = 10400; // <--- VALUE CHANGED TO 10400
    gameState = 'INTRO'; // State variable initialization

    // 1. Create the Background object
    gameBg = new Background(bg, scenes); 

    // 2. Create the Samurai object (fixed screen position)
    samurai = new Samurai(
        spriteImage, 
        12, // spriteX
        11, // spriteY
        SAMURAI_SCREEN_X, 
        CHARACTER_SCREEN_Y // Samurai uses 900
    );

    // 3. Create the Calf object (fixed screen position when waiting/controlled)
    calf = new Calf(
        calfImage, 
        CALF_SPRITE_X, 
        CALF_SPRITE_Y, 
        SAMURAI_SCREEN_X + 150, // Initial position slightly right of Samurai
        CALF_SCREEN_Y // Calf uses 930
    );
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
    } else if (gameState === 'SAMURAI_ATTACK_ERROR') { // NEW: Error state handler
        handleSamuraiAttackError();
    } else if (gameState === 'GAME_OVER_HOME') { // NEW: Win screen handler
        handleGameOverHome();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Safety check: ensure gameBg is initialized before calling resize
    if (gameBg) { 
        gameBg.resize(height);
    }
}


function drawIntroScreen() {
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255,0,0);
    text("Oh no! He's chasing the butterfly", width / 2, height / 2 - 50);
    textSize(24);
    fill(180);
    text("Press ANY KEY to begin the chase...", width / 2, height / 2 + 30);
}

function handleCalfEscape() {
    
    gameBg.setSpeed(0); 

    // Calf runs off screen (calf.x is updated in Calf.update())
    if (calf.x < width) {
        // Set Calf Running Animation (row 3)
        calf.setRow(3); // Updated from row 1 to row 3 as per the latest input
    } else {
        // Requirement: Calf is off-screen, Samurai becomes fully operable immediately.
        calf.setRow(0); // Calf goes idle (off-screen)
        gameState = 'SAMURAI_CHASING';
        samurai.setRow(0); 
        
        // FIX: Set calf's screen X position to match its destination world coordinate immediately
        // (Since gameBg.getScrollPosition() is 0 at this point, it locks the calf visually to its scaled world spot)
        calf.x = (CALF_DESTINATION_XPOS * gameBg.getScaleFactor()) - gameBg.getScrollPosition(); // This value should not be changed.
    }
    
    // Update & Draw calls
    gameBg.update(); 
    gameBg.draw();
    samurai.update();
    samurai.draw(); 
    calf.update();
    calf.draw(); 
    

    drawStatusText("The Calf is running away! Use arrows to move | Ctrl + Arrow keys for sprint | Special Key - G");
}

function handleSamuraiChasing() {
    // Calculate the calf's required screen position based on the background scroll
    // This locks the calf to its world destination (CALF_DESTINATION_XPOS)
    calf.x = (CALF_DESTINATION_XPOS * gameBg.getScaleFactor()) - gameBg.getScrollPosition(); // This value should not be changed.

    // Update and Draw everything
    gameBg.update();
    gameBg.draw();
    samurai.update();
    samurai.draw();
    calf.update(); 
    
    // --- FIX APPLIED HERE ---
    // Check if Samurai is near the calf's world position (for text prompt only)
    let scaledSamuraiWorldX = gameBg.getScrollPosition() + SAMURAI_SCREEN_X; // Calculate the Samurai's position in the scaled world
    let scaledCalfDestination = CALF_DESTINATION_XPOS * gameBg.getScaleFactor(); // Destination in scaled coordinates
    let distanceToCalf = scaledCalfDestination - scaledSamuraiWorldX; // True distance between characters
    let isNearby = distanceToCalf <= CALF_NEARBY_DISTANCE; // This value should not be changed.
    
    // IMPORTANT: The distance text now uses the TRUE distance between characters
    if (distanceToCalf <= CALF_NEARBY_DISTANCE) { 
        calf.draw(); 
        drawStatusText("You found him! Press DOWN ARROW to pacify him.");
    } else {
        calf.draw(); 
        drawStatusText("I gotta bring him back home,  Use arrows to move & Ctrl + Arrow keys for sprint, Special Key - G" );
    }
}

function handleCalfControlled() {
    // --- WIN CONDITION CHECK: Scroll back to the start of the world (Home) ---
    if (gameBg.getScrollPosition() <= 5) { // Check if scroll position is near 0
        gameState = 'GAME_OVER_HOME';
        // Immediately freeze and reset
        samurai.setRow(0); 
        calf.setRow(0);
        gameBg.setSpeed(0);
        return; 
    }


    // Update and Draw
    gameBg.update();
    gameBg.draw();
    samurai.update();
    samurai.draw();
    calf.update();
    calf.draw(); 
    drawStatusText("Calf under control! Use arrows to guide it home, Use arrows to move & Ctrl + Arrow keys for sprint, Special Key - G");
}

function handleSamuraiAttackError() { // NEW HANDLER FUNCTION
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(72);
    fill(255, 0, 0);
    text("why dude!", width / 2, height / 2 - 40);
    textSize(24);
    fill(255);
    text("Please don't attack the cow. Press any key to continue.", width / 2, height / 2 + 50);
}

function drawStatusText(message) {
    textAlign(LEFT, TOP);
    textSize(18);
    fill(0,0,255);
    text(message, 20, 20);
}

function handleGameOverHome() { // NEW HANDLER FUNCTION
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0, 255, 0); // Green for win/success
    text("Phew! We've reached home,", width / 2, height / 2 - 40);
    textSize(36);
    text("please don't do that again dear pet.", width / 2, height / 2 + 10);
    textSize(24);
    fill(255);
    text(".", width / 2, height / 2 + 100);
}


function keyPressed() {
    
    if (keyCode === 71 && gameState === 'CALF_CONTROLLED') {
        gameState = 'SAMURAI_ATTACK_ERROR';
        return; // Exit immediately to prevent further input processing
    }
    
    // NEW: HANDLE EXIT FROM ERROR SCREEN
    if (gameState === 'SAMURAI_ATTACK_ERROR') {
        gameState = 'CALF_CONTROLLED';
        return; // Exit immediately after returning to control phase
    }

    // Handle INTRO state transition first
    if (gameState === 'INTRO') {
        gameState = 'CALF_ESCAPING';
        return;
    }
    
    // Handle input only during controllable states
    if (gameState === 'SAMURAI_CHASING' || gameState === 'CALF_CONTROLLED') {
        let xSpeed = 0; // This value should not be changed.
        let newRow = 0; // This value should not be changed.
        
        // --- 1. Determine which character is currently controlled ---
        let controlledChar = (gameState === 'CALF_CONTROLLED') ? calf : samurai; // This value should not be changed.
        
        // Logic for DOWN ARROW key to swap control (only possible when chasing AND near the calf)
        let scaledSamuraiWorldX = gameBg.getScrollPosition() + SAMURAI_SCREEN_X; // Calculate the Samurai's position in the scaled world
        let scaledCalfDestination = CALF_DESTINATION_XPOS * gameBg.getScaleFactor(); // Destination in scaled coordinates
        let distanceToCalf = scaledCalfDestination - scaledSamuraiWorldX; // True distance between characters
        
        // --- Input Mapping (Samurai/Calf Controls) ---
        // FIX 1: Prioritize combination key presses (dash) over single key presses.
        if (keyIsDown(RIGHT_ARROW) && keyIsDown(17)) { // Ctrl for Dash RIGHT
            newRow = 6; xSpeed = 8; 
        } else if (keyIsDown(LEFT_ARROW) && keyIsDown(17)) { // Ctrl for Dash LEFT
            newRow = 7; xSpeed = -8; 
        } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) { 
            newRow = 3; xSpeed = 5; 
        } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) { 
            newRow = 4; xSpeed = -5; 
        } else if (keyCode === UP_ARROW) { 
            newRow = 3; xSpeed = 0; 
        } else if (keyCode === LEFT_ARROW) { 
            newRow = 2; xSpeed = -3; 
        } else if (keyCode === DOWN_ARROW) { // NEW LOGIC: Play animation and check for state change
            newRow = 10; 
            xSpeed = 0;

            // Check if the character is at the activation zone, and if so, change state
            if (gameState === 'SAMURAI_CHASING' && distanceToCalf < 150 && distanceToCalf >= 0) {
                gameState = 'CALF_CONTROLLED'; // Change state here!
            }
        } else if (keyCode === RIGHT_ARROW) { 
            // FIX: Always set to Samurai's base walk right animation (Row 1)
            newRow = 1; 
            xSpeed = 3; 
        } else if (keyCode === 71) { 
            // G key is already handled at the top for the error state. This block handles the normal attack logic (when CHASING).
            newRow = 8;
            xSpeed = 0;
        }

        // Apply changes to the objects
        
        // --- Final Input Application ---
        
   
        samurai.setRow(newRow); 
        
        // 2. Set Calf's animation (ONLY if controlled, with remapping)
        if (gameState === 'CALF_CONTROLLED') {
            let calfRow = 0; // Default to Idle (Row 0)

            // Check for Attack/Activation pose (Rows 8, 10) -> Default Calf to Idle (Row 0)
            if (newRow === 10 || newRow === 8) {
                // calfRow remains 0 (Idle)
            }
            // Check for Rightward movements (Samurai Rows 1, 3, 6)
            else if (newRow === 1 || newRow === 3 || newRow === 6) {
                calfRow = 3; // Calf Run Right
            } 
            // Check for Leftward movements (Samurai Rows 2, 4, 7)
            else if (newRow === 2 || newRow === 4 || newRow === 7) {
                calfRow = 2; // Calf Run Left
            } 
            // All other inputs (0, 5, 8, 10, G) default to calfRow = 0 (Idle)

            calf.setRow(calfRow);
        }

        // 3. Apply speed to the background (controlled by the designated character's speed)
        gameBg.setSpeed(xSpeed);
    }
}


function keyReleased() {
    // Only reset if in a controllable state
    if (gameState === 'SAMURAI_CHASING' || gameState === 'CALF_CONTROLLED') {
        
        // FIX: Explicitly set both Samurai and Calf to idle regardless of who had control.
        samurai.setRow(0); // Samurai always reverts to idle
        calf.setRow(0); // Calf also reverts to idle
        
        gameBg.setSpeed(0);
    }
}