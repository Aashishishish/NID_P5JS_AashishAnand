class Flower{
  constructor(x,y, xSpeed, ySpeed){
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

  }
  drawFlower(){

  ellipse(this.x, this.y, 100,20);
  ellipse(this.x, this.y, 20,100);
  ellipse(this.x, this.y, 20);

  }

  moveFlower(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

}