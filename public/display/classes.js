let state = {
  a: 6000, // changed by tap
  b: 6000, // changed by swipe
  c: 6000  // changed by long tap
}

// tap feedback on display
class Drop { 
  constructor(x, y, done, speed) {
    this.x = x,
    this.y = y,
    this.done = done,
    this.speed = speed
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
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.alpha = 1
    this.done = false
  }

  draw() {
    push();
    pg.noStroke();
    pg.fill(`rgba(60%, 0%, 75%, ${this.alpha})`);
    pg.circle(this.x, this.y, 75);
    pop();

    if(!this.done) { this.alpha -= 0.05 }

    if(this.alpha < 0) {
      this.alpha = 0
      this.done = true;
    }
  }
}
let sparks = [];
