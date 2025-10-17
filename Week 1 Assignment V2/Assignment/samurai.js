class Samurai {
    constructor(spriteImage, spriteX, spriteY, x, y) {
        this.spriteX = spriteX;
        this.sprites = sliceSpritesUtility(spriteImage, spriteX, spriteY); // Composition: calls utility function
        this.x = x;              
        this.y = y;              
        this.row = 0;            
        this.count = 0;          
    }

    // Updates the animation frame 
    update() {
        // Animate every 5 frames
        if (frameCount % 5 === 0) {
            this.count = (this.count + 1) % this.spriteX;
        }
    }

    // Draws the current sprite frame
    draw() {
        image(this.sprites[this.row][this.count], this.x, this.y);
    }

    // Method to set the current animation row (action)
    setRow(newRow) {
        this.row = newRow;
    }
}