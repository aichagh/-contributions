class Organic {

  constructor(r, x, y, dist, angle, color) {
    this.r = r; //radius
    this.x = x;
    this.y = y;
    this.dist = dist; // magnitude of how much the circle is distorted
    this.angle = angle;
    this.color = color;
  }

  draw(change) {
    push(); 
	pg_c.noStroke();
	pg_c.fill(this.color); 
	// pg_c.translate(this.x, this.y);
	// pg_c.rotate(this.angle + change);

    // making the path of the creature
	pg_c.beginShape(); 
	let n = 0;

    for (let i = 0; i < TWO_PI; i += 0.1) {
        let offset = map(noise(n, change), 0, 1, this.dist * -1, this.dist);
        let r = this.r + offset;
        let x = r * Math.cos(i);
        let y = r * Math.sin(i);
        pg_c.vertex(x + width / 2, y + height / 2);
        n += 0.1;
    }
	pg_c.endShape();

	pop();
	}
}