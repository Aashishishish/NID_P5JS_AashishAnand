today is the oldest you will ever been, but also the youngest you will ever be again.

Enjoy your experiences before it goes away. Capture experiences so can you treasure them forever.

People we care about, are only getting older. Urge them to enjoy these fleeting moments and Capture them doing them because in a few years, they will not be able to. And they can only reminicense about them. These captured moments will last forever with care.






Act 1


// --- Global Variables ---

let act1Images = []; // Array to store our 13 loaded images
let totalImages = 13; // The total number of images for this act
let currentImageIndex = 0; // Keeps track of which image we are showing

// --- 1. Preload Function ---

function preload() {
  // Loop to load 13 images from the 'assets' folder
  for (let i = 1; i <= totalImages; i++) {
    let filename = 'assets/A1_' + nf(i, 2) + '.png'; 
    console.log('Loading: ' + filename);
    act1Images.push(loadImage(filename));
  }
}

// --- 2. Setup Function ---

function setup() {
  // Creates the 1920x1080 canvas
  createCanvas(1920, 1080);
  console.log('Setup complete. Loaded ' + act1Images.length + ' images.');
}

// --- 3. Draw Function ---

function draw() {
  let currentImage = act1Images[currentImageIndex];
  
  // It will only draw if the image exists and is loaded.
  if (currentImage && currentImage.width > 0) {
    image(currentImage, 0, 0);
  }
}

// --- 4. Mouse Clicked Event ---
// --- THIS FUNCTION IS UPDATED ---

function mouseClicked() {
  
  // Check if the click was on the right half of the screen
  if (mouseX > width / 2) {
    // --- Go Forward ---
    // Check if we are not on the last image
    if (currentImageIndex < totalImages - 1) {
      currentImageIndex++;
    } else {
      console.log("End of Act 1.");
    }
  } 
  // Check if the click was on the left half of the screen
  else if (mouseX < width / 2) {
    // --- Go Backward ---
    // Check if we are not on the first image
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      console.log("Already at the beginning.");
    }
  }
}