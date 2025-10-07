function setup() {
  createCanvas(1200, 400);
}

function draw() {
  background(220);
  
  
  //Left
  
  fill("#97CBE142")
  noStroke();
  ellipse (200, 100, sin(frameCount/100)*150);
  ellipse (288, 150, frameCount%150);
  ellipse (288, 250, sin(frameCount/100)*150);
  ellipse (200, 300, frameCount%150);
  ellipse (112, 250, sin(frameCount/100)*150);
  ellipse (112, 150, frameCount%150);
  
  
  fill("#72C2E430")
  noStroke();
  ellipse (200, 100, frameCount%250);
  ellipse (288, 150, frameCount%250);
  ellipse (288, 250, frameCount%250);
  ellipse (200, 300, frameCount%250);
  ellipse (112, 250, frameCount%250);
  ellipse (112, 150, frameCount%250);
  
  
  fill('#72C2E430')
  noStroke();
  ellipse (200, 100, frameCount%100);
  ellipse (288, 150, frameCount%100);
  ellipse (288, 250, frameCount%100);
  ellipse (200, 300, frameCount%100);
  ellipse (112, 250, frameCount%100);
  ellipse (112, 150, frameCount%100);//
  
  fill('rgba(255,192,203,0.46)')
  noStroke();
  ellipse (200, 155, frameCount%100);
  ellipse (238, 175, frameCount%100);
  ellipse (238, 225, frameCount%100);
  ellipse (200, 245, frameCount%100);
  ellipse (162, 225, frameCount%100);
  ellipse (162, 175, frameCount%100);
  
  
  //Right 
  
  fill("#97CBE142")
  noStroke();
  ellipse (1000, 100, frameCount%150);
  ellipse (1088, 150, frameCount%150);
  ellipse (1088, 250, frameCount%150);
  ellipse (1000, 300, frameCount%150);
  ellipse (912, 250, frameCount%150);
  ellipse (912, 150, frameCount%150);
  
  
  fill("#72C2E430")
  noStroke();
  ellipse (1000, 100, frameCount%250);
  ellipse (1088, 150, frameCount%250);
  ellipse (1088, 250, frameCount%250);
  ellipse (1000, 300, frameCount%250);
  ellipse (912, 250, frameCount%250);
  ellipse (912, 150, frameCount%250);
  
  
  fill('#72C2E430')
  noStroke();
  ellipse (1000, 100, 100);
  ellipse (1088, 150, 100);
  ellipse (1088, 250, 100);
  ellipse (1000, 300, 100);
  ellipse (912, 250, 100);
  ellipse (912, 150, 100);//
  
  fill('rgba(255,192,203,0.46)')
  noStroke();
  ellipse (1000, 155, 100);
  ellipse (1038, 175, 100);
  ellipse (1038, 225, 100);
  ellipse (1000, 245, 100);
  ellipse (962, 225, 100);
  ellipse (962, 175, 100);
  
  

  
  //Central 
  
  
  fill("#97CBE130")
  noStroke();
  ellipse (600, 100, frameCount%500);
  ellipse (688, 150, frameCount%500);
  ellipse (688, 250, frameCount%500);
  ellipse (600, 300, frameCount%500);
  ellipse (512, 250, frameCount%500);
  ellipse (512, 150, frameCount%500);
  
   fill("#97CBE102")
  noStroke();
  ellipse (600, 100, frameCount%1000);
  ellipse (688, 150, frameCount%1000);
  ellipse (688, 250, frameCount%1000);
  ellipse (600, 300, frameCount%1000);
  ellipse (512, 250, frameCount%1000);
  ellipse (512, 150, frameCount%1000);
  
  //
  
  fill("#3AA0CD26")
  noStroke();
  ellipse (600, 100, frameCount%600);
  ellipse (688, 150, frameCount%600);
  ellipse (688, 250, frameCount%600);
  ellipse (600, 300, frameCount%600);
  ellipse (512, 250, frameCount%600);
  ellipse (512, 150, frameCount%600);
  
  
  fill('#72C2E430')
  noStroke();
  ellipse (600, 100, 100);
  ellipse (688, 150, 100);
  ellipse (688, 250, 100);
  ellipse (600, 300, 100);
  ellipse (512, 250, 100);
  ellipse (512, 150, 100);//
  
  fill('#FFC10733')
  noStroke();
  ellipse (600, 155, 150);
  ellipse (638, 175, 150);
  ellipse (638, 225, 150);
  ellipse (600, 245, 150);
  ellipse (562, 225, 150);
  ellipse (562, 175, 150);
  
  fill('#FFC1070F')
  noStroke();
  ellipse (600, 155, 350);
  ellipse (638, 175, 350);
  ellipse (638, 225, 350);
  ellipse (600, 245, 350);
  ellipse (562, 225, 350);
  ellipse (562, 175, 350);
  
  
  
  
  
  
}