const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
let isAnimating = false;

// 🎶 Music setup
const music = new Audio("nationalanthem.mp3");
music.loop = true;

// 🎨 Colors for confetti
function randomColor() {
  const colors = ['#ff4e88', '#ffb6c1', '#ffe1a8', '#a8e6cf', '#ffd3b6', '#a6c1ee'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 🎊 Create confetti pieces
function createConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20 + 10,
      color: randomColor(),
    });
  }
}

// 🖌️ Draw confetti
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();
  });
  updateConfetti();
}

// 📉 Update confetti position
function updateConfetti() {
  confetti.forEach((c) => {
    c.y += Math.cos(c.d) + 2;
    c.x += Math.sin(c.d);

    if (c.y > canvas.height) {
      c.x = Math.random() * canvas.width;
      c.y = -10;
    }
  });
}

// 🎬 Animate confetti
function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

// 🎁 Surprise button
document.getElementById('surpriseBtn').addEventListener('click', () => {
  confetti = [];
  createConfetti();

  if (!isAnimating) {
    isAnimating = true;
    animateConfetti();
  }

  // 🎶 Play music
  music.play();

  alert("🎉 TITETITETITETITE 💖 Happy Birthday, Nozomi!");
});
