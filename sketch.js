hearts = [];
let colors = ['#FD21CE', '#2ED258', '#FF9B00', '#008FFF'];
let currentColorIndex = 0;
let surpriseImage;
let buttonLink = "https://giphy.com/embed/hGFiFeUFnvUPjW8lEZ";
let eventDate = new Date("June 10, 2024 12:00:00").getTime(); // Set your event date and time here

function preload() {
  surpriseImage = loadImage("dog.png"); // Replace "path/to/your/image.png" with the actual image file path
  sound = loadSound("waf.mp3"); // Replace "sound.wav" with the actual sound file path
}

function setup() {
  canvas = createCanvas(500, 500);
  setInterval(changeColor, 1000); // Change color every second
  setInterval(changeFrameColors, 1000); // Change color every second
}

function draw() {
  // Black background
  background(0);

  // Falling hearts
  for (let i = 0; i < hearts.length; i++) {
    let heart = hearts[i];
    heart.y += heart.speed;
    if (heart.y > height + heart.size) {
      hearts.splice(i, 1);
      i--;
    } else {
      fill(heart.color);
      heart.draw();
    }
  }


  // Pink heart frame
  drawHeartFrame();

  // Headline
  let headline = "THE GREAT PET PARADE";
  let letterSize = 30;
  let headlineX = width / 6;
  let headlineY = height / 4;

  for (let i = 0; i < headline.length; i++) {
    let letter = headline.charAt(i);
    let letterColor = colors[i % colors.length];

    textSize(letterSize);
    textAlign(CENTER);
    fill(letterColor);
    text(letter, headlineX, headlineY);

    headlineX += textWidth(letter);
  }

  // Event Details - Countdown
  let now = new Date().getTime();
  let timeRemaining = eventDate - now;

  let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  let countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  textSize(24);
  textAlign(CENTER);
  fill(255);
  text("We start at TLV Port", width / 2, height / 2 - 20);
  text(countdown, width / 2, height / 2 + 20);
  text("Friday noon", width / 2, height / 2 + 60);

  // "Click on me" Text
  textSize(20);
  textAlign(CENTER);
  fill(255);
  let buttonText = "Click on me";
  let buttonTextWidth = textWidth(buttonText);
  let buttonTextX = width - 120 - buttonTextWidth - 10;
  let buttonTextY = height - 70;
  text(buttonText, buttonTextX, buttonTextY);

  // Surprise Image Button
  let imageButtonX = width - 320;
  let imageButtonY = height - 300;
  let imageButtonWidth = 400;
  let imageButtonHeight = 320;

  if (
    mouseX > imageButtonX &&
    mouseX < imageButtonX + imageButtonWidth &&
    mouseY > imageButtonY &&
    mouseY < imageButtonY + imageButtonHeight
  ) {
    cursor(HAND);
    fill(255, 100);
    rect(imageButtonX, imageButtonY, imageButtonWidth, imageButtonHeight);
  }

  // Surprise Image
  image(surpriseImage, imageButtonX, imageButtonY, imageButtonWidth, imageButtonHeight);
}

function mouseClicked() {
  if(!sound.isPlaying()) {
    sound.loop();
  }
  let imageButtonX = width - 195;
  let imageButtonY = height - 170;
  let imageButtonWidth = 200;
  let imageButtonHeight = 150;

  if (
    mouseX > imageButtonX &&
    mouseX < imageButtonX + imageButtonWidth &&
    mouseY > imageButtonY &&
    mouseY < imageButtonY + imageButtonHeight
  ) {
    window.open(buttonLink, "_blank");
  }
}

function changeColor() {
  let randomColor = random(colors);
  let randomX = random(width);
  let randomSize = random(10, 30);
  let randomSpeed = random(1, 3);

  let heart = {
    color: randomColor,
    x: randomX,
    y: -randomSize,
    size: randomSize,
    speed: randomSpeed,
    draw: function () {
      heartShape(this.x, this.y, this.size);
    },
  };

  hearts.push(heart);
}


function changeFrameColors() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

function drawHeartFrame() {
  let heartSize = 30;
  let heartSpacing = 20;

  noStroke();

  // Top hearts
  let topHeartX = heartSize;
  for (let i = 0; i < (width - 2 * heartSize) / (heartSize + heartSpacing); i++) {
    fill(colors[(currentColorIndex + i) % colors.length]);
    heart(topHeartX, heartSize);
    topHeartX += heartSize + heartSpacing;
  }

  // Right hearts
  let rightHeartY = heartSize;
  for (let i = 0; i < (height - 2 * heartSize) / (heartSize + heartSpacing); i++) {
    fill(colors[(currentColorIndex + i) % colors.length]);
    heart(width - heartSize, rightHeartY);
    rightHeartY += heartSize + heartSpacing;
  }

  // Bottom hearts
  let bottomHeartX = width - heartSize;
  for (let i = 0; i < (width - 2 * heartSize) / (heartSize + heartSpacing); i++) {
    fill(colors[(currentColorIndex + i) % colors.length]);
    heart(bottomHeartX, height - heartSize);
    bottomHeartX -= heartSize + heartSpacing;
  }

  // Left hearts
  let leftHeartY = height - heartSize;
  for (let i = 0; i < (height - 2 * heartSize) / (heartSize + heartSpacing); i++) {
    fill(colors[(currentColorIndex + i) % colors.length]);
    heart(heartSize, leftHeartY);
    leftHeartY -= heartSize + heartSpacing;
  }

  // Bottom right heart
  fill(colors[(currentColorIndex + 2) % colors.length]);
  heart(width - heartSize, height - heartSize);
}

function heart(x, y) {
  beginShape();
  vertex(x, y - 7);
  bezierVertex(x, y - 16, x - 12, y - 16, x - 12, y - 7);
  bezierVertex(x - 12, y - 1, x - 6, y + 4, x, y + 10);
  bezierVertex(x + 6, y + 4, x + 12, y - 1, x + 12, y - 7);
  bezierVertex(x + 12, y - 16, x, y - 16, x, y - 7);
  endShape();
}


function heartShape(x, y, size) {
  beginShape();
  vertex(x, y - size * 0.47);
  bezierVertex(x, y - size * 0.67, x - size * 0.4, y - size * 0.67, x - size * 0.4, y - size * 0.47);
  bezierVertex(x - size * 0.4, y - size * 0.27, x - size * 0.2, y - size * 0.07, x, y + size * 0.33);
  bezierVertex(x + size * 0.2, y - size * 0.07, x + size * 0.4, y - size * 0.27, x + size * 0.4, y - size * 0.47);
  bezierVertex(x + size * 0.4, y - size * 0.67, x, y - size * 0.67, x, y - size * 0.47);
  endShape();
}