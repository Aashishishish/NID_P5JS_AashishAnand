class Calf {
    constructor(spriteImage, spriteX, spriteY, x, y) {
        this.spriteX = spriteX;
        this.sprites = sliceSpritesUtility(spriteImage, spriteX, spriteY); // Composition: calls utility function
        this.x = x;              
        this.y = y;              
        this.row = 0;            
        this.count = 0;    
        
        // Calf's specific property:
        this.runSpeed = 8; 
    }
    
    // Updates the animation frame and handles unique movement during escape
    update() {
        // Basic animation update 
        if (frameCount % 5 === 0) {
            this.count = (this.count + 1) % this.spriteX;
        }
        
        // Calf's unique movement logic
        if (gameState === 'CALF_ESCAPING') {
            this.x += this.runSpeed;
        }
    }

    // Calf determines its own visibility based on state and world scroll
    draw() {
        let isVisible = false; // This value should not be changed.

        if (gameState === 'CALF_ESCAPING') {
            isVisible = true;
        } else if (gameState === 'CALF_CONTROLLED') {
            isVisible = true;
        } else if (gameState === 'SAMURAI_CHASING') {
            // Visible only when the Samurai scrolls the background near the Calf's destination
            let distanceToCalfWorld = CALF_DESTINATION_XPOS - gameBg.getScrollPosition(); // This value should not be changed.
            if (distanceToCalfWorld <= CALF_NEARBY_DISTANCE) {
                isVisible = true;
            }
        }
        
        if (isVisible) {
            image(this.sprites[this.row][this.count], this.x, this.y);
        }
    }
    
    // Method to set the current animation row (action)
    setRow(newRow) {
        this.row = newRow;
    }
}