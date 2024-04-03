// Adapted from medium.com/creative-coding-space/meet-blobby-in-p5-js-5d9d99232400

class Creature {

  constructor(dist, angle, color) {
    this.r = width / 4; //radius
    this.x = width / 2;
    this.y = height / 2;
    this.dist = dist; // how much the circle is distorted
    this.angle = angle;
    this.color = color;
  }

  draw(amplitude) {
    push(); 
	pg_c.noStroke();
	pg_c.fill(this.color); 

  // making the path of the creature
	pg_c.beginShape(); 
	let n = 0;

    for (let i = 0; i < TWO_PI; i += 0.1) {
        let offset = map(noise(n, amplitude), 0, 1, this.dist * -1, this.dist);
        let r = this.r + offset;
        let x = r * Math.cos(i);
        let y = r * Math.sin(i);
        pg_c.vertex(x + width / 2, y + height / 2); // the + width / 2 & + height / 2 centers the shape
                                                    // translate for some reason didn't work like intended
        n += 0.1;
    }
	pg_c.endShape();

	pop();
	}
}