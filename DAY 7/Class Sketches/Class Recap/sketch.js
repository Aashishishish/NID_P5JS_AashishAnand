// let myFlower;
// function setup(){
//   createCanvas(400,400);
//   myFlower = new Flower(200,200);

// }

// function draw(){
//   background(220);
//   myFlower.drawFlower();
// }






// steps
// click somewhre -> mousePressed
// create a flower at mouse position-> let variable = newFlower(mouseX,mouseY)
// let variable = new Flower (mouseX, mouseY)

// let flowers = [];
// function setup(){
//   createCanvas(400,400);


// }

// function draw(){
//   background(220);
//   for( let i = 0; i<flowers.length; i++){
//     flowers[i].changeColour(mouseX,mouseY);
//     flowers[i].moveFlower();
//     flowers[i].drawFlower();
//   }
// }

// function mousePressed(){
//   let tempFlower = new Flower(mouseX,mouseY, random(-5,5), random(-5,5));
//   flowers.push(tempFlower);
// }





// let flowers = [];
// function setup() {
//   createCanvas(innerWidth, innerHeight);


// }

// function draw() {
//   background(220);
//   for (let i = 0; i < flowers.length; i++) {
//     flowers[i].checkMousePosition(mouseX, mouseY);
//     flowers[i].moveFlower();
//     flowers[i].drawFlower();
//   }
// }

// function mousePressed() {
//   let tempFlower = new Flower(random(width), random(height), random(-5, 5), random(-5, 5));
//   flowers.push(tempFlower);
// }





let flowers = [];
function setup() {
  createCanvas(innerWidth, innerHeight);


}

function draw() {
  background(220);
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].checkMousePosition(mouseX, mouseY);
    flowers[i].moveFlower();
    flowers[i].drawFlower();
  }
}

function mousePressed() {
  let tempFlower = new Flower(random(width), random(height), random(-5, 5), random(-5, 5));
  flowers.push(tempFlower);
}