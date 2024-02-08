class Spring {
  constructor(a, b, length, color = "white", k = 0.2, t = 200) {
    this.a = a;
    this.b = b;
    this.length = length;
    this.k = k;
    this.t = t;
    this.broken = false;
    this.color = color;
  }

  is_broken() {
    if (this.broken) return true;
    this.broken = this.b.dist(this.a) >= this.t;
    return this.broken;
  }

  update() {
    const distance = this.b.dist(this.a);
    // console.log(distance);
    const delta = distance - this.length; // change in length
    const normal = this.a.sub(this.b).div_scaler(distance); // normal unit vector
    const spring_force = normal.mult_scaler(delta * -this.k); // apply spring force [ F = -k.x ]

    this.a.add_force(spring_force); // apply the force to first particle
    this.b.add_force(spring_force.mult_scaler(-1)); // apply negative of the force to next particle.
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
    ctx.closePath();
  }
}
