let socket, pg, pg_c, debugCanvas, bg;
let creature;
let i = 0;
let c = 0;

const stable = 50;
const medium = 150;
const unstable = 300;

let distortion = stable;

function preload() {
  bg = loadImage("bg2.png")
}

function setup() {
  // creating canvas and buffer
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
  pg_c = createGraphics(windowWidth, windowHeight);
  debugCanvas = createGraphics(windowWidth, windowHeight);

  // sockets
  socket = io.connect('http://localhost:3000')
  socket.on('tap', handleTap)
  socket.on('swipe', handleSwipe)
  socket.on('longTap', handleLongTap)

  creature = new Organic(width / 4, width / 2, height / 2, stable, 20, 0)
}

// handle logic for "well-being" calculation in draw since refreshed
function draw() {
  pg_c.background(255);
  pg_c.fill(0);
  // pg_c.circle(width / 2, height / 2, 150);
  creature.draw(c);
  c += 0.01
  
  image(pg_c, 0, 0, width, height);
  drawDrop();
  drawSparks();
  image(pg, 0, 0, width, height);
  pg.clear();

  updateState();
}

function handleTap(data) {
  // temp; for debug
  state.a += 50;

  let randX = round(Math.random() * width)
  let temp = new Drop(randX, 0, false, Math.random() * 3 + 1)

  drops.push(temp)
}

function handleSwipe(data) {
  // temp; for debug
  state.b += 250; 
  push();
  pg.noStroke();
  pg.fill("#91fff6");
  pg.rect(data.x, data.y, 50, 50);
  pop();
}

function handleLongTap(data) {
  // temp; for debug
  state.c += 500;
  
  let tempX = round(Math.random() * width);
  let tempY = round(Math.random() * height);

  let temp = new Spark(tempX, tempY);

  sparks.push(temp)
}

// used for debug to display the values stored in state
function debug() {
  debugCanvas.text(`a: ${Math.round(state.a)}`, 10, 10);
  debugCanvas.text(`b: ${Math.round(state.b)}`, width / 2, 10);
  debugCanvas.text(`c: ${Math.round(state.c)}`, width - 100, 10);
}

function drawDrop() {
  drops.forEach(d => {
    d.draw();
  });
}

function drawSparks() {
  sparks.forEach(s => {
    s.draw();
  });
}

function updateState() {
  state.a -= 1;
  state.b -= 1;
  state.c -= 1;

  if(state.a > 6000) {
    state.a = 6000
  } else if (state.a < 0) {
    state.a = 0
  }

  if(state.b > 6000) {
    state.b = 6000
  } else if (state.b < 0) {
    state.b = 0
  }

  if(state.c > 6000) {
    state.c = 6000
  } else if (state.c < 0) {
    state.c = 0
  }

  if(state.a < 2000 && state.b < 2000 && state.c < 2000) {
    print("unstable")
    creature = new Organic(width / 4, width / 2, height / 2, unstable, 20, 0)
  } else if(state.a < 4000 && state.b < 4000 && state.c < 4000) {
    print("medium")
    creature = new Organic(width / 4, width / 2, height / 2, medium, 20, 0)
  } else {
    print("stable")
    creature = new Organic(width / 4, width / 2, height / 2, stable, 20, 0)
  }
}