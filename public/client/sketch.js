// parameters
let p = {
  boolean: false,
  numeric: 50,
  numericMin: 0,
  numericMax: 100,
  numericStep: 1,
}

const youY = 250;
const oppY = 750;
let x = 0;
let win = false;

function preload() {
}

let socket;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5)
  
  x = 125;

  // add params to a GUI
  createParamGui(p, paramChanged);
  _paramGui.setPosition(-1000, -1000); // can customize where GUI is drawn
  // _paramGui.hide(); // uncomment to hide for presentations

  // set colour for your frame
  select('body').style('background: #000000;')

  socket = io.connect('http://localhost:3000')

  socket.on('key', function(data) {
    if(!data.win) {
      print(data)
      // background(0);
  
      fill("green")
      rect(100, 0, 5, height)
      rect(width - 100, 0, 5, height)
      textSize(40);
      text("S\nT\nA\nR\nT", 50, 350)
      text("F\nI\nN\nI\nS\nH", width - 50, 350)
  
      noStroke();
      fill('#1966ff')
      circle(data.x, data.y, 50);
    } else {
      win = true;
      textSize(32);
      textAlign(CENTER, CENTER);
      text("Blue wins! \nReload to play again :)", width / 2, 150)
    }
  })

  // don't centre
  // select('body').style('place-items: start start;')
  // _paramGui.setPosition(width + 10, 10); // can customize where GUI is drawn  

 }

function draw() {
  // background(240)
 
}

function keyPressed() {
  if (key == ' ') {
    if(!win) {
      x += 10

      fill("green")
      rect(100, 0, 5, height)
      rect(width - 100, 0, 5, height)
      textSize(40);
      text("S\nT\nA\nR\nT", 50, 350)
      text("F\nI\nN\nI\nS\nH", width - 50, 350)

      // background(0);

      noStroke()
      fill('#ff3838')
      circle(x, 250, 50);

      if(x >= width - 100) {
        win = true
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Red wins! \nReload to play again :)", width / 2, 150)
      }
    
      let data = { x: x, y: oppY, win: win }
      socket.emit('key', data)
    }
  }
}

function mousePressed() {
}

function mouseDragged() {

}

function windowResized() {
}

// global callback from the settings GUI
function paramChanged(name) {
}



