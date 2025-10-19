class Samurai {
    constructor(spriteImage, spriteX, spriteY, x, y) {
        this.spriteX = spriteX;
        this.sprites = sliceSpritesUtility(spriteImage, spriteX, spriteY); //Calls sprite slicing function
        this.x = x;              
        this.y = y;              
        this.row = 0;            
        this.count = 0;          
    }

     
    update() {
        
        if (frameCount % 5 === 0) {
            this.count = (this.count + 1) % this.spriteX;
        }
    }

    //Draws the current sprite frame
    draw() {
        image(this.sprites[this.row][this.count], this.x, this.y);
    }

    //To set the current animation row (action)
    setRow(newRow) {
        this.row = newRow;
    }
}