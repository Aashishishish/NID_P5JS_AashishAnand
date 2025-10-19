class Background {
    constructor(bgImg, scenesImg) {
        this.bg = bgImg;
        this.scenes = scenesImg;
        this.xPos = 0;
        this.xSpeed = 0;

        //Variables for scaled dimensions and scale factor
        
        this.scaledW = 0;
        this.scaledH = 0;
        this.scale = 1;
        this.calculateAndResize(height);
    }


    calculateAndResize(canvasHeight) {

        //Calculate the scaling factor based only on height
        this.scale = canvasHeight / BG_ORIGINAL_HEIGHT;

        //Calculate new dimensions
        this.scaledW = BG_ORIGINAL_WIDTH * this.scale;
        this.scaledH = canvasHeight; //Height matches canvas height

        //Resize the actual p5 images
        this.bg.resize(this.scaledW, this.scaledH);
        this.scenes.resize(this.scaledW, this.scaledH);
    }

    resize(newHeight) {
        //Recalculate based on the new canvas height
        this.calculateAndResize(newHeight);
    }

    //For updating the scroll position
    update() {
        this.xPos += this.xSpeed;

        //Boundary check 
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        // Right boundary
        if (this.xPos > this.scaledW - width) {
            this.xPos = this.scaledW - width;
        }
    }


    draw() {

        let bgnew = this.bg.get(this.xPos, 0, width, height);
        image(bgnew, 0, 0);

        let scenesnew = this.scenes.get(this.xPos, 0, width, height);
        image(scenesnew, 0, 0);
    }


    setSpeed(speed) {
        this.xSpeed = speed;
    }

    getScrollPosition() {
        return this.xPos;
    }

    getScaleFactor() {
        return this.scale;
    }
}
