let state = {
  a: 500, // changed by tap
  b: 500, // changed by swipe
  c: 500  // changed by long tap
}

let drop = {
  x: 0,
  y: 0
}

function preload() {
}

let socket;

function setup() {
  createCanvas(windowWidth, windowHeight)
  socket = io.connect('http://localhost:3000')
  socket.on('tap', handleTap)
  socket.on('swipe', handleSwipe)
  socket.on('longTap', handleLongTap)
}

// handle logic for "well-being" calculation in draw since refreshed
function draw() {
  background(255, 10) // remove in debug mode
  state.a -= 0.25;
  state.b -= 0.25;
  state.c -= 0.25;

  // debug()
}

function handleTap(data) {
  // temp; for debug
  state.a += 50;

  push();
  noStroke();
  fill('#1966ff');
  circle(data.x, data.y, 50);
  pop();
}

function handleSwipe(data) {
  // temp; for debug
  state.b += 50; 
  push();
  noStroke();
  fill("#91fff6");
  rect(data.x, data.y, 50, 50);
  pop();
}

function handleLongTap(data) {
  // temp; for debug
  state.c += 50;
  push();
  noStroke();
  fill("#8f1fff");
  circle(data.x, data.y, 75);
  pop();
}

// used for debug to display the values stored in state
function debug() {
  background(255);
  text(`a: ${Math.round(state.a)}`, 10, 10);
  text(`b: ${Math.round(state.b)}`, width / 2, 10);
  text(`c: ${Math.round(state.c)}`, width - 100, 10);
}
