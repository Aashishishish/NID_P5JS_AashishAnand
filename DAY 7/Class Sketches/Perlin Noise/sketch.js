function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,255);

  //1D Perlin Noise

  // let noiseValue = noise(0.01*frameCount+1000);
  // let noiseMapped = map(noiseValue, 0, 1, 10, 200);
  // ellipse(width/2, height/2, noiseMapped);

  //2D Perlin Noise

  for( let i = 0; i<width; i+=5){
    for(let j = 0; j<height; j+=5){
      let outputNoise = noise(0.005*(i+frameCount), 0.005*j)
      fill(outputNoise*255);
      noStroke();
      rect(i,j,5,5);
    }
  }
}
