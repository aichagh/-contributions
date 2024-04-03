function preload() {
}

let socket;

// for longTap
let timer = 1000;
let startTime = 0;

// for swipe
let startPos = {x: 0, y: 0};
let inSwipe = false;

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0);
  socket = io.connect('http://localhost:3000')
}

function draw() {
  background(0, 10)
}

function mouseClicked() {
  if(mouseX >= (width / 2) && mouseY < (height / 2)) {
    // sending data
    let data = {x: mouseX, y: mouseY}
    socket.emit('tap', data)

    // visual feedback 
    push();

    noFill();
    strokeWeight(5);
    stroke('#1966ff')
    circle(mouseX, mouseY, 45 + Math.random() * 10);

    pop();
  }
}

// function mouseDragged() {
//   if(mouseX < (width / 2)) {
//     let data = {x: mouseX, y: mouseY}
//     socket.emit('swipe', data)

//     push()

//     noStroke()
//     fill("#a5fadb")
//     circle(mouseX, mouseY, 30)

//     pop()

//   }
// }

function mousePressed() {
  if(mouseY >= height / 2 && mouseX >= width / 2) {
    startTime = millis();
  } else if(mouseX < height / 2 && mouseY >= height * 2 / 3) {
    startPos.x = mouseX;
    startPos.y = mouseY;
    inSwipe = true
  }
}

function mouseReleased() {
  if(millis() - startTime >= timer && mouseY >= height / 2 && mouseX >= width / 2) {
    let data = {x: mouseX, y: mouseY}
    socket.emit('longTap', data);

    // visual feedback
    push();

    noStroke();
    fill("#8f1fff");
    circle(mouseX, mouseY, 75);

    pop();

    startTime = 0;

  } else if(mouseX < (width / 2) && mouseY < height / 3 && inSwipe) {
    let data = {x: mouseX, y: mouseY}
    socket.emit('swipe', data);
    inSwipe = false

    // visual feedback
    push();

    noFill();
    strokeWeight(5);
    stroke('#f294f1')
    line(startPos.x, startPos.y, mouseX, mouseY);

    pop();
    
  } else {
    inSwipe = false
  }
}
