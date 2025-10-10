
let size = 100,genImages= [], noImages = 4;


function preload() {
 for(let i=0; i<noImages; i=i+1){
    let name = "images/g"+i+".jpeg";
    genImages[i] = loadImage(name);
 }
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(1);
}


function draw() {
  background(220);

  //nested for loop
  for(let i=0; i<width;i=i+size){
    for(let j=0; j<height; j=j+size) {

      let choice = floor(random(0,noImages));
      image(genImages[choice],i,j,size,size);
  }
}
}