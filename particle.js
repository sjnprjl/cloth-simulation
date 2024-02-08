class Particle extends Vec {
  constructor(x, y, color = "white") {
    super(x, y);
    this.vel = new Vec(0, 0);
    this.lock = false;
    this.color = color;
  }

  update(dt) {
    if (this.lock) return;

    this.add_with(this.vel.mult_scaler(dt));
    this.vel.mult_scaler_with(0.99); // damping
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  add_force(force_vector) {
    this.vel.add_with(force_vector);
  }
}

