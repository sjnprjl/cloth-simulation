// -------------------------------
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let gravity = new Vec(0, 0.2);
const gap = 5;

const MAX_WIDTH = Math.floor(400 / gap);
const MAX_HEIGHT = Math.floor(200 / gap);

let width, height;

let particles,
  springs,
  touch_history = [];

let frame = 0;
let pds = 0; // prev delta step

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  width = Math.min(Math.floor((canvas.width * 0.75) / gap), MAX_WIDTH);
  height = Math.min(Math.floor((canvas.height * 0.15) / gap), MAX_HEIGHT);

  particles = [];
  springs = [];
  touch_history = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const particle = new Particle(
        j * gap + canvas.width / 2 - (width * gap) / 2,
        i * gap + canvas.height / 4,
      );
      if (i == 0) {
        particle.lock = true;
      }
      particles.push(particle);
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const id = i * width + j;
      const a = particles[id];
      const b = particles[id + 1];
      const c = particles[(i - 1) * width + j];
      if (i > 0) {
        springs.push(new Spring(a, c, gap));
      }
      if (j !== width - 1) springs.push(new Spring(a, b, gap));
    }
  }
}

function touch_trail(ctx, history) {
  for (let i = 0; i < history.length - 1; i++) {
    const first = history[i];
    const second = history[i + 1];

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(first.x, first.y);
    ctx.lineTo(second.x, second.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function loop(ts) {
  let ds = ts - frame;

  // ? if ts spiked due to tab change, use previous ds
  // to avoid high rate of change of distance.
  if (pds > 0 && ds / pds > 1) {
    ds = pds;
  }

  pds = ds;
  frame = ts;
  const c = 20; // ?
  const dt = ds / 1000;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  touch_trail(ctx, touch_history);

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
    particles[i].add_force(gravity);

    if (
      touch_history.length > 1 &&
      touch_history.at(-1).dist(particles[i]) <= 20
    ) {
      const mag = touch_history.at(-1).dist(touch_history.at(-2));
      const normal = touch_history.at(-1).sub(touch_history.at(-2));
      particles[i].add_force(normal);
    }
    particles[i].update(dt * c);
  }

  for (let i = 0; i < springs.length; i++) {
    if (!springs[i].is_broken()) {
      springs[i].draw(ctx);
      springs[i].update(dt);
    }
  }

  if (touch_history.length > 1) touch_history.shift();

  requestAnimationFrame(loop);
}

setup();

requestAnimationFrame((ts) => {
  frame = ts;
  loop(ts);
});

addEventListener("mousemove", (e) => {
  touch_history.push(new Vec(e.clientX, e.clientY));
});

addEventListener("touchmove", (e) => {
  const m = new Vec(e.touches[0].clientX, e.touches[0].clientY);
  touch_history.push(m);
});
addEventListener("touchend", () => {
  touch_history = [];
});

addEventListener("resize", () => {
  setup();
});
