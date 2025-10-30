// --- CONSTANTS AND GLOBAL STATE ---
const PADDLE_W = 15; 
const PADDLE_H = 80; 
const BALL_RADIUS = 10;
const PADDLE_MARGIN_X = 15; 
const SCORE_OFFSET_X = 100; 
const SCORE_OFFSET_Y = 50; 
const SCORE_LIMIT = 5;

// AUDIO THRESHOLDS (Calculated based on 800x600 area = 480,000 sq pixels)
const EXPANSION_THRESHOLD = 480000 / 3; // 1/3 of canvas area
const SHRINK_THRESHOLD = 480000 / 800;  // FIX: Reduced to 1/500th (960) to prevent immediate trigger by default 1200 area

// FONT SIZES
const FONT_SIZE_NORMAL = 30; 
const FONT_SIZE_SMALL = 18; 
const FONT_SIZE_MEDIUM = 32; 
const FONT_SIZE_LARGE = 60; 

// 10PRINT CONSTANTS
const TEN_PRINT_TILE_SIZE = 5; 
const TEN_PRINT_GRID_W = 40; 
const TEN_PRINT_GRID_H = 30; 

// Game State Constants
const STATE = {
    START: 0,
    STAGNATION: 1, 
    TRANSCENDENCE: 2, 
    END_LAST_MAN: 3,
    END_UBERMENSCH: 4,
    END_NOTHINGNESS: 5
};

let game;
let keysHeld = {};
let isModifying = false; 
let audioSystem; // Global instance of the audio manager

// 10Print drawing state
let tenPrintX;
let tenPrintY;
let tenPrintStartX;

// Global variables for preloaded sounds (must be defined before preload)
let s1, s2, s3, s4, s5; // s5 added for Equilibrium

// --- CORE P5.js FUNCTIONS ---

function preload() {
    // Loads all external assets before setup() runs.
    try {
        s1 = loadSound('assets/song_1.mp3');
        s2 = loadSound('assets/song_2.mp3');
        s3 = loadSound('assets/song_3.mp3');
        s4 = loadSound('assets/song_4.mp3');
        s5 = loadSound('assets/song_5.mp3'); // Added song_5

    } catch (e) {
        console.error("Failed to load sound files. Check file paths and P5.js sound library inclusion.", e);
    }
}

function setup() {
    // Sets up the canvas dimensions and initial state
    createCanvas(800, 600);
    // Note: Passing all 5 songs now
    audioSystem = new AudioSystem([s1, s2, s3, s4, s5]); 
    game = new Game();

    textSize(FONT_SIZE_NORMAL); 
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    // Calculate 10Print start position once
    tenPrintStartX = width / 2 + SCORE_OFFSET_X - (TEN_PRINT_GRID_W / 2);
    tenPrintY = SCORE_OFFSET_Y - TEN_PRINT_GRID_H / 2; 
    
    game.changeState(STATE.START);
}

function draw() {
    // P5.js main loop
    background(255); 
    game.update();
    game.draw();
}

function keyPressed() {
    keysHeld[keyCode] = true;
    game.handleKey(keyCode, true);
}

function keyReleased() {
    keysHeld[keyCode] = false;
    game.handleKey(keyCode, false);
}

// --- AUDIO SYSTEM CLASS ---

class AudioSystem {
    constructor(songs) {
        this.songs = songs; // Array of p5.SoundFile objects (s1, s2, s3, s4, s5)
        this.currentSongIndex = -1;
        this.currentSong = null;
        this.activeThresholdSong = null; // Tracks s3, s4, or s5
    }

    stopAll() {
        this.songs.forEach(s => {
            if (s && s.isPlaying()) {
                // Stop with a short fade for a cleaner sound
                s.setVolume(0, 0.1); 
                s.stop(0.1);
            }
        });
        this.currentSongIndex = -1;
        this.currentSong = null;
        this.activeThresholdSong = null;
    }

    playSong(index, shouldLoop = true, volume = 0.5) {
        const nextSong = this.songs[index - 1];
        if (!nextSong || (this.currentSong && this.currentSong === nextSong)) return;

        // Stop all sounds before starting a new primary song
        this.stopAll(); 

        // Play and fade in new song
        if (nextSong) {
            nextSong.loop(shouldLoop);
            nextSong.setVolume(0);
            nextSong.amp(volume, 1.0); // 1.0 sec fade in
            this.currentSong = nextSong;
            this.currentSongIndex = index;
            this.activeThresholdSong = null;
        }
    }
    
    // Handles playing s3, s4, or s5
    playThresholdSong(index) {
        const nextSong = this.songs[index - 1];
        if (!nextSong) return;

        // If the intended threshold song is already playing, do nothing
        if (this.activeThresholdSong && this.activeThresholdSong === nextSong) return;

        // Stop current threshold song (s3, s4, or s5) if any
        if (this.activeThresholdSong && this.activeThresholdSong.isPlaying()) {
             this.activeThresholdSong.setVolume(0, 0.5);
             this.activeThresholdSong.stop(0.5); 
        }
        
        // CRITICAL: Stop Song 2 if s3 or s4 is starting (Extreme State)
        if (index === 3 || index === 4) {
            if (this.currentSongIndex === 2) {
                this.currentSong.setVolume(0, 0.5);
                this.currentSong.stop(0.5); 
                this.currentSongIndex = -1; // Indicate s2 is no longer playing
                this.currentSong = null;
            }
        }
        
        // Start playing the new threshold song
        nextSong.loop(true);
        nextSong.setVolume(0);
        nextSong.amp(0.9, 1.0); // Fade in high volume
        this.activeThresholdSong = nextSong;
    }
    
    // Stops s3, s4, or s5 (only called when paddle returns to s2's domain)
    stopThresholdSong() {
        if (this.activeThresholdSong) {
            this.activeThresholdSong.setVolume(0, 1.0);
            this.activeThresholdSong.stop(1.0); 
            this.activeThresholdSong = null;
        }
    }

    update() {
        if (game.state === STATE.START) {
            this.stopAll();
            return;
        }
        
        // Ensure s2 is playing if we are in Transcendence but not in an extreme threshold
        const isCurrentlyInExtremeThreshold = 
            game.paddleB.w * game.paddleB.h >= EXPANSION_THRESHOLD || 
            game.paddleB.w * game.paddleB.h <= SHRINK_THRESHOLD;

        // Update threshold songs only in Transcendence state
        if (game.state === STATE.TRANSCENDENCE) {
            
            // 1. Check if S2 should be playing (Base Transcendence)
            // S2 should play if no threshold song is active AND we are not in an extreme area.
            if (!this.activeThresholdSong && !isCurrentlyInExtremeThreshold) {
                 if (this.currentSongIndex !== 2) {
                    this.playSong(2, true, 0.5); // Restart s2 if necessary
                }
            }

            // Delay checking thresholds for a short time after entering TRANSCENDENCE
            if (game.thresholdCheckDelay < 60) {
                game.thresholdCheckDelay++;
                return; 
            }

            const paddleArea = game.paddleB.w * game.paddleB.h;
            let thresholdTriggered = false;

            // --- 1. EXPANSION (s3) ---
            if (paddleArea >= EXPANSION_THRESHOLD) {
                this.playThresholdSong(3); 
                game.extremeThresholdCrossed = true; 
                thresholdTriggered = true;
            } 
            // --- 2. SHRINK (s4) ---
            else if (paddleArea <= SHRINK_THRESHOLD) {
                this.playThresholdSong(4); 
                game.extremeThresholdCrossed = true; 
                thresholdTriggered = true;
            }
            // --- 3. EQUILIBRIUM (s5) ---
            // Play S5 ONLY if an extreme threshold has been crossed and the area is back in the middle range.
            else if (game.extremeThresholdCrossed && paddleArea > SHRINK_THRESHOLD && paddleArea < EXPANSION_THRESHOLD) {
                // Ensure S2 is stopped before S5 starts
                if (this.currentSongIndex === 2) {
                    this.currentSong.setVolume(0, 0.5);
                    this.currentSong.stop(0.5); 
                    this.currentSongIndex = -1;
                    this.currentSong = null;
                }
                
                this.playThresholdSong(5); 
                thresholdTriggered = true;
            } 
            
            // Handle stopping if returned to base transcendence area 
            if (!thresholdTriggered) {
                this.stopThresholdSong();
            }
        }
        
        // Ensure extreme songs continue loudly in end states
        if (game.state === STATE.END_UBERMENSCH) {
            this.playThresholdSong(3);
        } else if (game.state === STATE.END_NOTHINGNESS) {
            this.playThresholdSong(4);
        }
    }
}


// --- UTILITY FUNCTIONS ---

function scoreToTally(score) {
    // Converts numeric score to tally marks
    return "|".repeat(score);
}

function resetTenPrint() {
    // Resets the horizontal position of the 10Print pattern
    tenPrintX = tenPrintStartX; 
}

function drawTenPrintSegment() {
    // Draws one segment of the chaotic 10Print pattern
    const size = TEN_PRINT_TILE_SIZE;
    const segment_y_start = tenPrintY;
    const segment_y_end = tenPrintY + TEN_PRINT_GRID_H; 
    
    if (random(1) < 0.5) {
        line(tenPrintX, segment_y_start, tenPrintX + size, segment_y_end);
    } else {
        line(tenPrintX, segment_y_end, tenPrintX + size, segment_y_start);
    }

    tenPrintX += size;
    
    // Wrap around to start of the score box
    if (tenPrintX >= tenPrintStartX + TEN_PRINT_GRID_W) { 
        tenPrintX = tenPrintStartX;
    }
}


// --- PADDLE CLASS ---

class Paddle {
    constructor(x, y, isAI) {
        this.x = x;
        this.y = y;
        this.w = PADDLE_W;
        this.h = PADDLE_H;
        this.speed = 8;
        this.isAI = isAI;
        this.score = 0;
        this.moveX = 0;
        this.moveY = 0;
    }

    draw() {
        fill(0);
        noStroke();
        // Draws a black, rectangular paddle
        rect(this.x, this.y, this.w, this.h, 0); 
    }

    aiMove(ball) {
        // Simple AI logic to track the ball's Y position
        const targetY = ball.y;
        const centerOffset = 35; 
        if (targetY < this.y - centerOffset) {
            this.y -= this.speed * 0.7;
        } else if (targetY > this.y + centerOffset) {
            this.y += this.speed * 0.7;
        }
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }

    playerMove() {
        // Player movement is restricted if a transcendence key sequence is held
        if (!isModifying) {
            this.y += this.moveY * this.speed;
            this.x += this.moveX * this.speed;
        } 
        
        // Constrain paddle to the canvas boundaries
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
        this.x = constrain(this.x, this.w / 2, width - this.w / 2);
    }

    continuousTranscend(type) {
        // Logic for continuous modification of paddle dimensions based on held keys
        const step = 0.5; 
        const factor = 1.005; 

        if (type === "y_grow") {
            this.h += step;
        } else if (type === "y_shrink") {
            this.h = max(1, this.h - step);
        } else if (type === "x_grow") {
            this.w += step;
        } else if (type === "x_shrink") {
            this.w = max(1, this.w - step);
        } else if (type === "shrink_all") {
            // Ultimate Freedom: Shrinks both dimensions exponentially
            this.h = max(1, this.h / factor);
            this.w = max(1, this.w / factor);
        } 
        else if (type === "expand_left") {
            // True Freedom: Expands and shifts toward the center
            this.h += step;
            this.w += step;
            this.x -= step * 0.5; 
        } else if (type === "expand_right") {
            // True Freedom: Expands and shifts toward the edge
            this.h += step;
            this.w += step;
            this.x += step * 0.5; 
        }

        this.h = constrain(this.h, 0, height);
        this.w = constrain(this.w, 0, width);
    }
}

// --- BALL CLASS ---

class Ball {
    constructor() {
        this.r = BALL_RADIUS;
        this.baseSpeed = 8.4;
        this.reset();
    }

    reset() {
        // Places ball in center and assigns randomized direction
        this.x = width / 2;
        this.y = height / 2;

        let angle = random(-PI / 4, PI / PI);
        if (random(1) < 0.5) angle += PI; 

        this.xSpeed = this.baseSpeed * cos(angle);
        this.ySpeed = this.baseSpeed * sin(angle);
    }

    update() {
        // Moves the ball and checks top/bottom wall collision
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.y - this.r < 0 || this.y + this.r > height) {
            this.ySpeed *= -1;
        }
    }

    draw() {
        fill(0);
        ellipse(this.x, this.y, this.r * 2);
    }

    checkPaddle(paddle) {
        // Robust directional collision check
        const paddleX1 = paddle.x - paddle.w / 2;
        const paddleX2 = paddle.x + paddle.w / 2;
        const paddleY1 = paddle.y - paddle.h / 2;
        const paddleY2 = paddle.y + paddle.h / 2;
        
        let shouldReflect = false;
        const inVerticalRange = this.y + this.r > paddleY1 && this.y - this.r < paddleY2;

        if (inVerticalRange) {
            if (paddle.x < width / 2) { // Left Paddle (AI) - moving left to hit right face
                if (this.xSpeed < 0 && this.x - this.r <= paddleX2) { 
                    shouldReflect = true;
                    this.x = paddleX2 + this.r; 
                    this.xSpeed *= -1;
                }
            } else { // Right Paddle (User) - moving right to hit left face
                if (this.xSpeed > 0 && this.x + this.r >= paddleX1) {
                    shouldReflect = true;
                    this.x = paddleX1 - this.r; 
                    this.xSpeed *= -1;
                }
            }
        }
        
        // Secondary Collision Check (Top/Bottom Edge Reflection)
        if (!shouldReflect) {
            let closestX = constrain(this.x, paddleX1, paddleX2);
            let closestY = constrain(this.y, paddleY1, paddleY2);

            let distanceSquared = (this.x - closestX) * (this.x - closestX) + (this.y - closestY) * (this.y - closestY);

            if (distanceSquared <= (this.r * this.r)) {
                shouldReflect = true;
                this.ySpeed *= -1; 
                // Nudge ball out of the paddle region
                if (this.y < paddle.y) { 
                    this.y = paddleY1 - this.r;
                } else { 
                    this.y = paddleY2 + this.r;
                }
            }
        }

        if (shouldReflect) {
            // Apply slight vertical deflection 
            if (abs(this.xSpeed) > 0) {
                this.ySpeed = (this.y - paddle.y) * 0.3; 
            }
            
            // Maintain constant speed magnitude
            let currentSpeed = sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed);
            this.xSpeed = (this.xSpeed / currentSpeed) * this.baseSpeed;
            this.ySpeed = (this.ySpeed / currentSpeed) * this.baseSpeed;
        }
    }
}


// --- GAME CLASS (State Machine) ---

class Game {
    constructor() {
        this.state = STATE.START;
        this.transcended = false;
        this.fadeAlpha = 0;
        this.textAlpha = 0;
        this.introTimer = 0; 
        this.lastManText = ""; // To store the winner text for the END_LAST_MAN state
        this.extremeThresholdCrossed = false; // NEW FLAG for S5 logic
        this.thresholdCheckDelay = 0; // NEW: Timer to delay threshold checking

        this.ball = new Ball();
        this.paddleA = new Paddle(PADDLE_MARGIN_X, height / 2, true);
        this.paddleB = new Paddle(width - PADDLE_MARGIN_X, height / 2, false);
    }

    changeState(newState) {
        this.state = newState;
        this.fadeAlpha = 0;
        this.textAlpha = 0;
        this.introTimer = 0; 
        this.thresholdCheckDelay = 0; // Reset timer on state change

        // Audio Management on State Change
        if (newState === STATE.START) {
            this.paddleA.score = 0;
            this.paddleB.score = 0;
            this.paddleB.w = PADDLE_W;
            this.paddleB.h = PADDLE_H;
            this.paddleB.x = width - PADDLE_MARGIN_X;
            this.transcended = false;
            this.extremeThresholdCrossed = false; // Reset the flag
            this.ball.reset();
            audioSystem.stopAll();
        } else if (newState === STATE.STAGNATION) {
            audioSystem.playSong(1); // Play song_1 upon entering stagnation
        } else if (newState === STATE.TRANSCENDENCE) {
            this.transcended = true;
            resetTenPrint(); 
            // CRITICAL: Play Song 2 upon entering transcendence. Threshold logic will handle s2 stopping if s3/s4 starts.
            audioSystem.playSong(2, true, 0.5); 
        } else if (newState === STATE.END_UBERMENSCH) {
            // UPDATED: Removed stopAll() and playSong(3). Rely on AudioSystem.update() to maintain S3.
        } else if (newState === STATE.END_NOTHINGNESS) {
            // UPDATED: Removed stopAll() and playSong(4). Rely on AudioSystem.update() to maintain S4.
        } else if (newState === STATE.END_LAST_MAN) {
            // UPDATED: Removed audioSystem.stopAll() here to allow song_1 to continue playing.
            // Song_1 is guaranteed to be playing if we reach END_LAST_MAN.
        }
    }

    checkHeldSequences() {
        // Checks for complex, simultaneous key presses (Acts of Will/Defiance)
        const UP = UP_ARROW, DOWN = DOWN_ARROW, LEFT = LEFT_ARROW, RIGHT = RIGHT_ARROW;
        const isHeld = (...keys) => keys.every(k => keysHeld[k]);
        
        if (isHeld(UP, DOWN, LEFT, RIGHT)) return "shrink_all"; 
        if (isHeld(UP, DOWN, LEFT) && !isHeld(RIGHT)) return "expand_left";
        if (isHeld(UP, DOWN, RIGHT) && !isHeld(LEFT)) return "expand_right";
        if (isHeld(UP, DOWN) && !isHeld(LEFT) && !isHeld(RIGHT)) return "y_grow";
        if (isHeld(LEFT, RIGHT) && !isHeld(UP) && !isHeld(DOWN)) return "x_grow";
        if (isHeld(DOWN, UP, RIGHT) && !isHeld(LEFT)) return "x_shrink";
        if (isHeld(RIGHT, LEFT, UP) && !isHeld(DOWN)) return "y_shrink";
        
        return null;
    }

    update() {
        if (this.state === STATE.STAGNATION || this.state === STATE.TRANSCENDENCE) {
            this.ball.update();
            this.paddleA.aiMove(this.ball);
            this.paddleB.playerMove();

            this.ball.checkPaddle(this.paddleA);
            this.ball.checkPaddle(this.paddleB);

            const heldSequence = this.checkHeldSequences();
            isModifying = !!heldSequence; 
            
            if (heldSequence) {
                this.paddleB.continuousTranscend(heldSequence);
                if (!this.transcended) {
                    this.changeState(STATE.TRANSCENDENCE);
                }
            }

            this.checkGoals();
            this.checkEndConditions();
        }
        
        // Update audio system for paddle size thresholds
        if (this.state === STATE.TRANSCENDENCE) {
            audioSystem.update();
        }
    }

    // --- DRAWING METHODS ---

    drawCourt() {
        // Draws the center line
        stroke(0, 100);
        strokeWeight(2);
        line(width / 2, 0, width / 2, height);

        // Draws the rounded black border (Update 1)
        noFill();
        stroke(0);
        strokeWeight(5); // Increased weight for visibility
        // Draws a rectangle from the center, covering the whole canvas, with 10px rounded corners
        rect(width / 2, height / 2, width, height, 10);
    }

    drawAIScore() {
        fill(0); 
        textSize(FONT_SIZE_NORMAL);
        text(scoreToTally(this.paddleA.score), width / 2 - SCORE_OFFSET_X, SCORE_OFFSET_Y);
    }

    drawPlayerBScore() {
        fill(0); 
        textSize(FONT_SIZE_NORMAL);
        text(scoreToTally(this.paddleB.score), width / 2 + SCORE_OFFSET_X, SCORE_OFFSET_Y);
    }
    
    drawScores() {
        // Draws the rigid score tally in the STAGNATION state
        this.drawAIScore();
        this.drawPlayerBScore();
    }

    drawChaoticScores() {
        // Draws AI score and the chaotic 10Print pattern for Player B
        this.drawAIScore(); 
        noFill();
        stroke(0); 
        strokeWeight(1); 

        // Draw segments multiple times for continuous change
        for(let i = 0; i < 5; i++) {
            drawTenPrintSegment();
        }
    }
    
    drawStartScreen() {
        
        // Draw the rounded black border for the start screen (Update 2)
        noFill();
        stroke(0);
        strokeWeight(5); // Consistent weight
        //rect(width / 2, height / 2, width, height, 10); // 10px rounded corners
        
        // FIX: Remove stroke after drawing the border so the text is not corrupted
        noStroke(); 

        const lineSpacing = 30;
        let currentY = height / 2.5 - lineSpacing * 2.5; // Adjusted start Y for more lines
        
        // Updated philosophical questions (Update 4)
        const questions = [
            "Ask yourself these questions before you begin.",
            " ",
            "What is existence?",
            "Why do I exist?",
            "Am I born with a purpose?",
            "Or do I make my own pupose and meaning?",
            "Why do I exist at all?",
            "Do I need to exist?"
        ];

        // Display questions instantly
        fill(0); 
        textSize(FONT_SIZE_SMALL); 

        for (let i = 0; i < questions.length; i++) {
            text(questions[i], width / 2, currentY);
            currentY += lineSpacing;
        }

        // Display prompt text
        currentY += lineSpacing * 1.5; // Adjusted spacing for the longer list

        textSize(FONT_SIZE_SMALL);
        text("Relax, Enjoy, Take your time, Press ENTER to begin when you are Ready.", width / 2, currentY); 
    }
    
    drawFadeEffects(endText) {
        // Handles the fade-to-black and text display for end states
        this.fadeAlpha = min(255, this.fadeAlpha + 2);
        fill(0, this.fadeAlpha); // Fade to black
        rect(width / 2, height / 2, width, height); // Covers the entire canvas

        if (this.fadeAlpha > 200) {
            this.textAlpha = min(255, this.textAlpha + 1.5);
            fill(255, this.textAlpha); // White text

            // Determine font size based on state
            let mainFontSize = FONT_SIZE_LARGE; 
            if (this.state === STATE.END_LAST_MAN || this.state === STATE.END_NOTHINGNESS || this.state === STATE.END_UBERMENSCH) {
                 mainFontSize = FONT_SIZE_SMALL;
            }
           
            textSize(mainFontSize);
            // This is where the multi-line text is drawn. text() can handle '\n' for new lines.
            text(endText, width / 2, height / 2 - 30); 
            
            textSize(FONT_SIZE_SMALL);
            // MODIFIED: Increased vertical offset from +50 to +100 (Correction 26/Update 6)
            text("Press R if you want to explore a different path.", width / 2, height / 2 + 150); 
        }
    }

    draw() {
        
        if (this.state === STATE.START) {
            this.drawStartScreen();
        } else if (this.state === STATE.STAGNATION || this.state === STATE.TRANSCENDENCE) {
            // Draw court elements only in play states
            this.drawCourt(); 
            
            this.ball.draw();
            this.paddleA.draw();
            this.paddleB.draw();

            if (this.state === STATE.STAGNATION) {
                this.drawScores();
            } else {
                this.drawChaoticScores();
            }
        } else if (this.state === STATE.END_LAST_MAN) {
            // Fade to black
            this.drawFadeEffects(this.lastManText);
        } else if (this.state === STATE.END_UBERMENSCH) {
            // The final multi-line text for Ubermensch ending
            const ubermenschText = 
                "You chose to defy your pre-determined purpose.\n" +
                "You realized this existence without meaning was absurd.\n" +
                "This realization rendered the world meaningless.\n" +
                "Thus, you chose to create your own meaning.\n" +
                "Your own purpose.\n" +
                "You chose Progress."
                "You've transcended.\n" +               
                "You have become The Übermensch.\n" +
                "You have become The Overman."
                "You've achieved True Freedom." ;
                
            this.drawFadeEffects(ubermenschText); 
        } else if (this.state === STATE.END_NOTHINGNESS) {
            // Multi-line text for Nothingness ending
            const nothingnessText = 
                "You chose to defy your pre-determined purpose.\n" +
                "You realized this existence without meaning was absurd.\n" +
                "Your realized there is no point, no meaning in this existence.\n" +
                "You chose to remove yourself from the equation.\n" +
                "You chose regression."
                "You sought self destruction.\n" +
                "You sought nothingness.\n" +
                "You became The Void.\n" +
                "You achieved Ultimate Freedom.";

            // Fade to black, white text
            this.drawFadeEffects(nothingnessText); 
        }
    }

    // --- GAME LOGIC ---

    checkGoals() {
        let scored = false;
        if (this.ball.x - this.ball.r < 0) {
            this.paddleB.score++;
            scored = true;
        } else if (this.ball.x + this.ball.r > width) {
            this.paddleA.score++;
            scored = true;
        }

        if (scored) {
            this.ball.reset();
        }
    }

    checkEndConditions() {
        const paddleBW = this.paddleB.w;
        const paddleBH = this.paddleB.h;

        if (paddleBW <= 1 && paddleBH <= 1 && this.state !== STATE.END_NOTHINGNESS) {
            this.changeState(STATE.END_NOTHINGNESS);
            return;
        }
        
        if (paddleBW >= width && paddleBH >= height && this.state !== STATE.END_UBERMENSCH) {
            this.changeState(STATE.END_UBERMENSCH);
            return;
        }

        if (!this.transcended && (this.paddleA.score >= SCORE_LIMIT || this.paddleB.score >= SCORE_LIMIT)) {
            // Determine winner text for the Last Man ending
            let winnerText;
            const winner = this.paddleB.score > this.paddleA.score ? "YOU" : "SYSTEM";
            
            winnerText = `${winner} WON.\n\n` +
                        `You chose to just exist.\n` +
                        `You fulfilled your pre-determined fate.\n` +
                        `You are the one who embraces his given purpose.\n` +
                        `You chose to struggle and keep Everything in its Right Place.\n` +
                        `You chose not to progress nor regress.\n` +
                        `You chose stagnation.\n` +                      
                        `You are the The Last Man.\n` +
                        `You and the System are One and the Same.`;

            this.lastManText = winnerText;
            this.changeState(STATE.END_LAST_MAN);
        }
    }

    // --- KEY HANDLER ---

    handleKey(key, isPressed) {
        // Restart key 'R'
        if (isPressed && key === 82) { 
            if (this.state >= STATE.END_LAST_MAN) {
                this.changeState(STATE.START);
                return;
            }
        }

        // Start key 'ENTER'
        if (this.state === STATE.START && key === ENTER && isPressed) {
            this.changeState(STATE.STAGNATION);
            return;
        }

        if (this.state !== STATE.STAGNATION && this.state !== STATE.TRANSCENDENCE) {
            return; 
        }

        // Normal movement keys
        if (key === UP_ARROW) {
            this.paddleB.moveY = isPressed ? -1 : 0;
        } else if (key === DOWN_ARROW) {
            this.paddleB.moveY = isPressed ? 1 : 0;
        }

        if (key === LEFT_ARROW) {
            this.paddleB.moveX = isPressed ? -1 : 0;
            if (isPressed && !this.transcended) this.changeState(STATE.TRANSCENDENCE);
        } else if (key === RIGHT_ARROW) {
            this.paddleB.moveX = isPressed ? 1 : 0;
            if (isPressed && !this.transcended) this.changeState(STATE.TRANSCENDENCE);
        }
    }
}
