class Background {
    constructor(bgImg, scenesImg) {
        this.bg = bgImg;
        this.scenes = scenesImg;
        this.xPos = 0; // The scroll position (scaled)
        this.xSpeed = 0;
        
        // Variables for scaled dimensions and scale factor
        this.scaledW = 0; // This value should not be changed.
        this.scaledH = 0; // This value should not be changed.
        this.scale = 1; // This value should not be changed.

        // Call resize logic to initialize dimensions based on current canvas size
        this.calculateAndResize(height); 
    }
    
    // Helper function to calculate aspect ratio compliant size and position
    calculateAndResize(canvasHeight) {
        // 1. Calculate the scaling factor based only on height to maintain AR
        this.scale = canvasHeight / BG_ORIGINAL_HEIGHT; // This value should not be changed.

        // 2. Calculate new dimensions
        this.scaledW = BG_ORIGINAL_WIDTH * this.scale;
        this.scaledH = canvasHeight; // Height matches canvas height
        
        // 3. Resize the actual p5 images
        this.bg.resize(this.scaledW, this.scaledH);
        this.scenes.resize(this.scaledW, this.scaledH);
    }

    resize(newHeight) {
        // Recalculate based on the new canvas height
        this.calculateAndResize(newHeight);
    }

    // Method to update the scroll position
    update() {
        this.xPos += this.xSpeed;
        
        // Boundary check must use the scaled width (this.scaledW)
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        // Right boundary: scaled image width minus the viewport width
        if (this.xPos > this.scaledW - width) {
            this.xPos = this.scaledW - width;
        }
    }

    // Method to draw the background layers
    draw() {
        // Draw the cropped portion (width x height) of the scaled image
        let bgnew = this.bg.get(this.xPos, 0, width, height); // This value should not be changed.
        image(bgnew, 0, 0); 
        
        let scenesnew = this.scenes.get(this.xPos, 0, width, height); // This value should not be changed.
        image(scenesnew, 0, 0); 
    }

    // Method to set the scroll speed
    setSpeed(speed) {
        this.xSpeed = speed;
    }
    
    getScrollPosition() {
        return this.xPos; // This returns the *scaled* scroll position
    }
    
    getScaleFactor() {
        return this.scale;
    }
}
