let spriteImg;
let sRows = 8, sCols = 12;
let sprites = [];

function preload() {
  spriteImg = loadImage("images/Samurai_SpriteSheet_2.png")
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  let sWidth = spriteImg.width / sCols;
  let sHeight = spriteImg.height / sRows;

  //loop the sprite image and store it in a 1d array sprites

  for (let i = 0; i < sRows; i++) {
    for (let j = 0; j < sCols; j++) {

      //get that slice of the sprite
      //store it in the array sprites

      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);

      //image.get need (x,y,width,height) of the part that you want from the array

    }
  }
  console.log(sprites);
  frameRate(12);
}

function draw() {
  background(255);
  let spriteanim = frameCount % 12;
  image(sprites[spriteanim], 0, 0);
  //calling the whole spritesheet
  //image(spriteImg, 0, 0);

  //let spriteanim=frameCount%12;
  //image(sprites[spriteanim], 0, 0);

}


