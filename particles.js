const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
function createParticle(x, y) {
  particles.push({
    x, y,
    vx: Math.random()*10-5,
    vy: Math.random()*10-5,
    life: 100,
    color: `hsl(${Math.random()*360},100%,50%)`
  });
}

function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i) => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 8, 8);
    p.x += p.vx; p.y += p.vy; p.life--;
    if (p.life <= 0) particles.splice(i,1);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Trigger on wrong answer
function bloodSplatter() {
  for(let i=0; i<200; i++) {
    createParticle(innerWidth/2, innerHeight/2);
  }
  confetti({particleCount: 300, spread: 180, origin: { y: 0.6 }, colors:['#f00']});
}
