// class Flower{
//   constructor(x,y, xSpeed, ySpeed){
//     this.x = x;
//     this.y = y;
//     this.xSpeed = xSpeed;
//     this.ySpeed = ySpeed;
//     this.size =50;

//   }
//   drawFlower(){

//   ellipse(this.x, this.y, 100,20);
//   ellipse(this.x, this.y, 20,100);
//   ellipse(this.x, this.y, this.size);

//   }

//   moveFlower(){
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;

//   if(this.y>height || this.y<0){
//     this.ySpeed = -this.ySpeed;
//   }
//   if(this.x>width || this.x<0){
//     this.xSpeed=-this.xSpeed;
//   }

//  }
//  changeColour(mX,mY){
//   //if mX and mY are close to cotd.
//  //cotd.-> this.x and this.y, make the flower red, else make it white
//  let distance = dist(mX, mY, this.x, this.y);
//  if(distance<this.size/2){
//   fill(255,0,0);
//  } else {
//   fill(0,255,0);
//  }
//  }
// }


// class Flower {
//   constructor(x, y, xSpeed, ySpeed) {
//     this.x = x;
//     this.y = y;
//     this.xSpeed = xSpeed;
//     this.ySpeed = ySpeed;
//     this.size = 50;
//     this.selected = false;

//   }
//   drawFlower() {

//     if (this.selected == true) {
//       fill("red");
//     } else {
//       fill ("white");
//     }

//     ellipse(this.x, this.y, 100, 20);
//     ellipse(this.x, this.y, 20, 100);
//     ellipse(this.x, this.y, this.size);

//   }

//   moveFlower() {
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;

//     if (this.y > height || this.y < 0) {
//       this.ySpeed = -this.ySpeed;
//     }
//     if (this.x > width || this.x < 0) {
//       this.xSpeed = -this.xSpeed;
//     }

//   }
//   checkMousePosition(mX, mY) {
//     //if mX and mY are close to cotd.
//     //cotd.-> this.x and this.y, make the flower red, else make it white
//     let distance = dist(mX, mY, this.x, this.y);

//     if (distance < this.size / 2) {
//       this.selected = true;
//     } 
//     // else {
//     //   this.selected = false;
//     // }
//   }
// }


class Flower {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = 50;
    this.selected = false;

  }
  drawFlower() {

    if (this.selected == true) {
      fill("red");
    } else {
      fill ("white");
    }

    ellipse(this.x, this.y, 100, 20);
    ellipse(this.x, this.y, 20, 100);
    ellipse(this.x, this.y, this.size);

  }

  moveFlower() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y > height || this.y < 0) {
      this.ySpeed = -this.ySpeed;
    }
    if (this.x > width || this.x < 0) {
      this.xSpeed = -this.xSpeed;
    }

  }
  checkMousePosition(mX, mY) {
    //if mX and mY are close to cotd.
    //cotd.-> this.x and this.y, make the flower red, else make it white
    let distance = dist(mX, mY, this.x, this.y);

    if (distance < this.size / 2) {
      this.selected = true;
    } 
    // else {
    //   this.selected = false;
    // }
  }
}
