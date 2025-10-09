
let size = 100;
function setup() {
  createCanvas(1000, 1000);
  frameRate(12);
}


function draw() {
  background(220);

  for (let i = 0; i < width; i=i+size) {
    for (let j = 0; j < height; j =j +size) {

      let choice = floor(random(0, 4));

      if (choice == 1) {
        fill("red");
        rect(i,j,size,size);
      } 
      
      else if (choice == 2) {
        fill("yellow");
        rect(i,j,size,size);
      } 
      
      else if(choice == 3){
         fill("cyan");
        rect(i,j,size,size);

      } 
      else {
        fill("pink");
        rect(i,j,size,size);
        
      }
        
      
    
    }
      
  }
}