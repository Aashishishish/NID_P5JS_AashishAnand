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



  for (let i = 0; i < sRows; i++) {
    for (let j = 0; j < sCols; j++) {



      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);



    }
  }
  console.log(sprites);
  frameRate(12);
}

function draw() {
  background(255, 0, 0);

  if (mouseIsPressed) {
    let spriteanim = frameCount % 12;
    image(sprites[spriteanim], 700, 300);

  } else {
    let spriteanim = frameCount % 1;
    image(sprites[spriteanim], 700, 300);
  }

}


