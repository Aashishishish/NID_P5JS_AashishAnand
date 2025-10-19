let CALF_SPRITE_X;
let CALF_SPRITE_Y; 
let WORLD_WIDTH; 
let SAMURAI_SCREEN_X; 
let SAMURAI_SCREEN_Y; 
let CALF_SCREEN_Y; 
let CALF_NEARBY_DISTANCE; 
let CALF_DESTINATION_XPOS; 
let gameState; 
let BG_ORIGINAL_WIDTH; 
let BG_ORIGINAL_HEIGHT; 
let bg, scenes, spriteImage, calfImage;
let gameBg, samurai, calf; 
let bgmusic;




 /* This function is used by both the Samurai and Calf constructors. */

function sliceSpritesUtility(spriteImage, spriteX, spriteY) {
    let sprites = [];
    let w = spriteImage.width / spriteX; 
    let h = spriteImage.height / spriteY; 
    let i = 0;

    for (i = 0; i < spriteY; i++) {
        sprites[i] = [];
        let j = 0; 
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
    calfImage = loadImage("assets/calf10.png");
    soundFormats('ogg', 'mp3');
    bgmusic = loadSound("assets/always with me flute - spirited away.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    //Defining values for variables.

    CALF_SPRITE_X = 6; //number of columns in calf sprite sheet.
    CALF_SPRITE_Y = 4; // number of rows in calf sprite sheet.
    BG_ORIGINAL_WIDTH = 11520; 
    BG_ORIGINAL_HEIGHT = 1080; 
    WORLD_WIDTH = 11520; 
    SAMURAI_SCREEN_X = 700;
    SAMURAI_SCREEN_Y = 560; 
    CALF_SCREEN_Y = 630; 
    CALF_NEARBY_DISTANCE = 150; //calf control activation distance.
    CALF_DESTINATION_XPOS = 10350; //calf resting postition after running.
    gameState = 'INTRO'; 

    //Creating the background object.
   
    gameBg = new Background(bg, scenes); 

    //Creating the samurai object.  

    samurai = new Samurai( spriteImage, 12, 11, SAMURAI_SCREEN_X, SAMURAI_SCREEN_Y );

    //Creating the Calf object.

    calf = new Calf(calfImage,  CALF_SPRITE_X,  CALF_SPRITE_Y, SAMURAI_SCREEN_X + 150, CALF_SCREEN_Y );
    
}



function draw() {
    background(220);
    
    
    
    if (gameState === 'INTRO') {
        drawIntroScreen();
    } else if (gameState === 'CALF_ESCAPING') {
        handleCalfEscape();
    } else if (gameState === 'SAMURAI_CHASING') {
        handleSamuraiChasing();
    } else if (gameState === 'CALF_CONTROLLED') {
        handleCalfControlled();
    } else if (gameState === 'SAMURAI_ATTACK_ERROR') { 
        handleSamuraiAttackError();
    } else if (gameState === 'GAME_OVER_HOME') { 
        handleGameOverHome();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    if (gameBg) { 
        gameBg.resize(height);
    }
}


function drawIntroScreen() {
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(220);
    text("Oh no! He's chasing a butterfly", width / 2, height / 2 - 50);
    textSize(37);
    fill(200,0,0);
    text("He might get lost!", width / 2, height / 2 );

    textSize(24);
    fill(0,0,255);
    text("Press 'M' for music (recommended).", width / 2, height / 2 + 200 );

    textSize(22);
    fill(180);
    text("Press ANY KEY to begin ", width / 2, height / 2 + 250);
}

function handleCalfEscape() {
    
    gameBg.setSpeed(0); 

    // Calf runs off screen.
    
    if (calf.x < width) {
        calf.setRow(3); 
    } else {
        calf.setRow(0);
        gameState = 'SAMURAI_CHASING';
        samurai.setRow(0); 
        calf.x = (CALF_DESTINATION_XPOS * gameBg.getScaleFactor()) - gameBg.getScrollPosition(); 
    }
    
    // Update & Draw calls
    gameBg.update(); 
    gameBg.draw();
    samurai.update();
    samurai.draw(); 
    calf.update();
    calf.draw(); 
    

    drawStatusText("Use arrows to move | Ctrl + Arrow keys for sprint | Attack - G");
}

function handleSamuraiChasing() {

    calf.x = (CALF_DESTINATION_XPOS * gameBg.getScaleFactor()) - gameBg.getScrollPosition(); //Locks the calf to its world destination.

    // Update and Draw calls
    gameBg.update();
    gameBg.draw();
    samurai.update();
    samurai.draw();
    calf.update(); 
    

    // Check if Samurai is near the calf's world position (for text prompt only)
    
    let scaledSamuraiWorldX = gameBg.getScrollPosition() + SAMURAI_SCREEN_X; // Calculate the Samurai's position 
    let scaledCalfDestination = CALF_DESTINATION_XPOS * gameBg.getScaleFactor();
    let distanceToCalf = scaledCalfDestination - scaledSamuraiWorldX; // True distance between characters
    
   
    if (distanceToCalf <= CALF_NEARBY_DISTANCE) { 
        calf.draw(); 
        drawStatusText("There he is & the butterfly! i guess they're friends now. | Hold DOWN ARROW to pacify him.");
    } else {
        calf.draw(); 
        drawStatusText("Use arrows to move | Ctrl + Arrow keys for sprint | Attack - G" );
    }
}

function handleCalfControlled() {
    //WIN CONDITION CHECK: Scroll back to the start of the world (Home)

    if (gameBg.getScrollPosition() <= 5) { 
        gameState = 'GAME_OVER_HOME';
        samurai.setRow(0); 
        calf.setRow(0);
        gameBg.setSpeed(0);
        return; 
    }

    gameBg.update();
    gameBg.draw();
    samurai.update();
    samurai.draw();
    calf.update();
    calf.draw(); 
    drawStatusText("Let's go back home :D");
}

function handleSamuraiAttackError() { 
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(72);
    fill(255, 0, 0);
    text("why dude!", width / 2, height / 2 - 40);
    textSize(24);
    fill(255);
    text("Please don't attack the calf. Press any key to continue.", width / 2, height / 2 + 50);
}

function drawStatusText(message) {
    textAlign(CENTER, CENTER);
    textSize(18);
    fill(205,240,255);
    text(message, width/2, height/4);
}

function handleGameOverHome() { 
    fill(20);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0, 255, 0); 
    text("yay, you reached back.", width / 2, height / 2 - 40);
}


function keyPressed() {

    if (keyCode ===77){
        bgmusic.play(); //toggle bg music.
    }
    
    
    if (keyCode === 71 && gameState === 'CALF_CONTROLLED') {
        gameState = 'SAMURAI_ATTACK_ERROR';
        return; // Exit immediately to prevent further input processing
    }
    
    
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
        let xSpeed = 0; 
        let newRow = 0; 

        let scaledSamuraiWorldX = gameBg.getScrollPosition() + SAMURAI_SCREEN_X; // Calculate the Samurai's position in the world
        let scaledCalfDestination = CALF_DESTINATION_XPOS * gameBg.getScaleFactor(); // Destination in scaled coordinates
        let distanceToCalf = scaledCalfDestination - scaledSamuraiWorldX; // True distance between characters
        
        //Input Mapping (Samurai/Calf Controls)

        //Prioritize combination key presses (dash) over single key presses.

        if (keyIsDown(RIGHT_ARROW) && keyIsDown(17)) { 
            newRow = 6; xSpeed = 8; 
        } else if (keyIsDown(LEFT_ARROW) && keyIsDown(17)) { 
            newRow = 7; xSpeed = -8; 
        } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) { 
            newRow = 3; xSpeed = 5; 
        } else if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) { 
            newRow = 4; xSpeed = -5; 
        } else if (keyCode === UP_ARROW) { 
            newRow = 3; xSpeed = 0; 
        } else if (keyCode === LEFT_ARROW) { 
            newRow = 2; xSpeed = -3; 
        } else if (keyCode === DOWN_ARROW) { //Play animation and check for state change
            newRow = 10; 
            xSpeed = 0;

            // Check if the character is at the activation zone, and if so, change state
            if (gameState === 'SAMURAI_CHASING' && distanceToCalf < 150 && distanceToCalf >= 0) {
                gameState = 'CALF_CONTROLLED'; // Game state changes here.
            }
        } else if (keyCode === RIGHT_ARROW) { 
            // FIX: Always set to Samurai's base walk right animation (Row 1)
            newRow = 1; 
            xSpeed = 3; 
        } else if (keyCode === 71) { 
            //This block handles the normal attack logic (when CHASING).
            newRow = 8;
            xSpeed = 0;
        }


        
        //Final Input Remapping and corretions.
        
   
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

        gameBg.setSpeed(xSpeed);
    }
}


function keyReleased() {
    
    if (gameState === 'SAMURAI_CHASING' || gameState === 'CALF_CONTROLLED') {
        

        samurai.setRow(0); // Samurai always reverts to idle
        calf.setRow(0); // Calf also reverts to idle
        
        gameBg.setSpeed(0);
    }
}