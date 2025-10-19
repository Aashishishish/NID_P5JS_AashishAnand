class Calf {
    constructor(spriteImage, spriteX, spriteY, x, y) {
        this.spriteX = spriteX;
        this.sprites = sliceSpritesUtility(spriteImage, spriteX, spriteY); // Calls sprite slicing function
        this.x = x;
        this.y = y;
        this.row = 0;
        this.count = 0;
        this.runSpeed = 4;
    }

    
    update() {
         
        if (frameCount % 5 === 0) {
            this.count = (this.count + 1) % this.spriteX;
        }

        
        if (gameState === 'CALF_ESCAPING') {
            this.x += this.runSpeed;
        }
    }

    
    draw() {
        let isVisible = false; 

        if (gameState === 'CALF_ESCAPING') {
            isVisible = true;
        } else if (gameState === 'CALF_CONTROLLED') {
            isVisible = true;
        } else if (gameState === 'SAMURAI_CHASING') {

            if (gameState === 'CALF_ESCAPING' || gameState === 'CALF_CONTROLLED' || gameState === 'SAMURAI_CHASING') {
                isVisible = true;
            }
        }

        if (isVisible) {
            image(this.sprites[this.row][this.count], this.x, this.y);
        }
    }

    //To set the current animation row (action)
    setRow(newRow) {
        this.row = newRow;
    }
}


