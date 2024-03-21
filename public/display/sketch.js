// parameters
let p = {
  boolean: false,
  numeric: 50,
  numericMin: 0,
  numericMax: 100,
  numericStep: 1,
}

function preload() {
}

let socket;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5)

  // add params to a GUI
  createParamGui(p, paramChanged);
  _paramGui.hide(); // uncomment to hide for presentations

  // set colour for your frame
  select('body').style('background: #f4f4f4;')

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
}



