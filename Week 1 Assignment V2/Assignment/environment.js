class Background {
    constructor(bgImg, scenesImg, canvasHeight, totalWidth) {
        this.bg = bgImg;
        this.scenes = scenesImg;
        this.xPos = 0; // The scroll position
        this.xSpeed = 0;
        this.totalWidth = totalWidth;

        this.bg.resize(totalWidth, canvasHeight);
        this.scenes.resize(totalWidth, canvasHeight);
    }
    
    resize(newHeight) {
        this.bg.resize(this.totalWidth, newHeight);
        this.scenes.resize(this.totalWidth, newHeight);
    }

    // Method to update the scroll position
    update() {
        this.xPos += this.xSpeed;
        
        // Keep xPos within the bounds of the world (using if conditions)
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.xPos > this.totalWidth - width) {
            this.xPos = this.totalWidth - width;
        }
    }

    // Method to draw the background layers
    draw() {
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
        return this.xPos;
    }
}