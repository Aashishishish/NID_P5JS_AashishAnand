class Block {
  constructor(x, y){
    this.x = x; 
    this.y = y; 
    this.angle = 0;
    this.color = 70;
  }
  
  display(offset, d){
    push();
    noFill();
	stroke(this.color);
    translate(this.x, this.y);
    this.mouseHover(d);
    rotate(this.angle);
    rect(0, 0, size-offset, size-offset);
    pop();
  }
  
  mouseHover(d){
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < d){
      this.angle += 0.1;
      this.color = 255;
    } else {
      if (this.angle > 0 && this.angle <= 10) {
        this.angle += 0.1;
      } else if (this.angle > 10){
        this.angle = 0;
      }
      
      if (this.color > 70){
        this.color -= 3; 
      } else {
        this.color = 70;
      }
    }
  }
}