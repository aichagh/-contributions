let state = {
  a: 6000, // changed by tap
  b: 6000, // changed by swipe
  c: 6000  // changed by long tap
}

// tap feedback on display
class Drop { 
  constructor() {
    this.x = Math.random() * width,
    this.y = 0,
    this.done = false,
    this.speed = Math.random() * 3 + 1
  }

  draw() {
    if(!this.done) {
      push();
      pg.noStroke();
      pg.fill('#1966ff');
      pg.circle(this.x, this.y, 10);
      pop();

      this.y += this.speed;

      if(this.y > height + 5) {
        this.done = true
      }
    }
  }
}
let drops = [];


// long tap feedback on display
class Spark { 
  constructor() {
    this.x = Math.random() * width,
    this.y = Math.random() * height,
    this.alpha = 1
    this.done = false
    this.size = 50;
  }

  draw() {
    push();
    pg.noStroke();
    pg.fill(`rgba(60%, 0%, 75%, ${this.alpha})`);
    pg.circle(this.x, this.y, this.size);
    pop();

    if(!this.done) { this.alpha -= 0.05 }

    if(this.alpha < 0) {
      this.alpha = 0
      this.done = true;
    }

    this.size -= 1;
  }
}
let sparks = [];

class Swirl {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.rad = Math.random() * 10 + 30; // 30 - 40
    this.rot = 0;
    this.alpha = 1;
  }

  draw() {
    if(this.rot < TWO_PI) {
      push();
      pg.noStroke();
      pg.fill(`rgba(80%, 70%, 80%, ${this.alpha})`);
      pg.circle(this.x + this.rad * Math.cos(this.rot), 
                this.y + this.rad * Math.sin(this.rot), 10);
      pop();

      this.rot += 0.1;
      this.alpha -= 0.01;

      if(this.alpha < 0) {
        this.alpha = 0
      }
    }
  }
}
let swirls = [];