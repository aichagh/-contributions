let socket, pg, pg_c, debugCanvas, bg;
let creature;
let i = 0;
let c = 0;

const stable = 50;
const medium = 150;
const unstable = 300;

const stable_c = "#96ffe0"
const medium_c = "#b5832b";
const unstable_c = "#660b03";

const creature_stable_c = "#12b5b0"
const creature_medium_c = "#5e3d1e"
const creature_unstable_c = "#000000"

let bg_color = stable_c;

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

  creature = new Creature(stable, 20, creature_stable_c)
}

// handle logic for "well-being" calculation in draw since refreshed
function draw() {
  pg_c.background(bg_color);
  pg_c.fill(0);
  // pg_c.circle(width / 2, height / 2, 150);
  creature.draw(c);
  c += 0.01
  
  image(pg_c, 0, 0, width, height);
  drawDrop();
  drawSparks();
  drawSwirls();
  image(pg, 0, 0, width, height);
  pg.clear();

  updateState();
}

function handleTap(data) {
  state.a += 10;
  let temp = new Drop();
  drops.push(temp)
}

function handleSwipe(data) {
  state.b += 25; 
  let temp = new Swirl();
  swirls.push(temp);
}

function handleLongTap(data) {
  state.c += 50;
  let temp = new Spark();
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

function drawSwirls() {
  swirls.forEach(s => {
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
    creature = new Creature(unstable, 20, creature_unstable_c);
    bg_color = unstable_c;
  } else if(state.a < 4000 && state.b < 4000 && state.c < 4000) {
    creature = new Creature(medium, 20, creature_medium_c);
    bg_color = medium_c;
  } else {
    creature = new Creature(stable, 20, creature_stable_c);
    bg_color = stable_c;
  }
}