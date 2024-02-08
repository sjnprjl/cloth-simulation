// -------------------------
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(vec) {
    return this.copy().add_with(vec);
  }

  sub(vec) {
    return this.copy().sub_with(vec);
  }
  mult(vec) {
    return this.copy().mult_with(vec);
  }
  div(vec) {
    return this.copy().div_with(vec);
  }
  add_with(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }
  sub_with(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }
  mult_with(vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  }
  div_with(vec) {
    this.x /= vec.x;
    this.y /= vec.y;
    return this;
  }

  div_scaler(s) {
    return this.div(new Vec(s, s));
  }

  mult_scaler(v) {
    return this.mult(new Vec(v, v));
  }

  mult_scaler_with(s) {
    return this.mult_with(new Vec(s, s));
  }

  div_scaler_with(s) {
    return this.div_with(new Vec(s, s));
  }
  copy() {
    return new Vec(this.x, this.y);
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dist(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
