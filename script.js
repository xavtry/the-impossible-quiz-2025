
import { questions } from './questions.js';

let current = 0;
let lives = 3;
let skips = 7;
let bombInterval = null;

function loadQuestion() {
  const q = questions[current];
  document.getElementById('qNum').textContent = current+1;
  document.getElementById('question').textContent = q.q;
  document.getElementById('lifeCount').textContent = lives;
  document.getElementById('skipCount').textContent = skips;

  const opts = document.getElementById('options');
  opts.innerHTML = '';
  q.a.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = text;
    div.onclick = () => checkAnswer(i);
    opts.appendChild(div);
  });

  if (q.bomb) {
    let time = 10;
    document.getElementById('bombTimer').textContent = time;
    bombInterval = setInterval(() => {
      time--;
      document.getElementById('bombTimer').textContent = --time;
      if (time <= 0) wrongAnswer();
    }, 1000);
  } else {
    document.getElementById('bombTimer').textContent = '';
    clearInterval(bombInterval);
  }
}

function checkAnswer(choice) {
  clearInterval(bombInterval);
  if (choice === questions[current].c) {
    confetti({particleCount: 100, spread: 70, origin: { y: 0.6 }});
    current++;
    if (current >= questions.length) victory();
    else setTimeout(loadQuestion, 800);
  } else wrongAnswer();
}

function wrongAnswer() {
  lives--;
  bloodSplatter();
  new Audio('assets/lose.mp3').play();
  if (lives <= 0) {
    document.getElementById('finalQ').textContent = current+1;
    document.getElementById('gameOver').classList.remove('hidden');
  } else loadQuestion();
}

function victory() {
  confetti({particleCount: 500, spread: 180, origin: { y: 0.6 }});
  new Audio('assets/win.mp3').play();
  document.getElementById('victory').classList.remove('hidden');
}

document.getElementById('skipBtn').onclick = () => {
  if (skips > 0) { skips--; current++; loadQuestion(); }
};

// BLOCK TAB
document.addEventListener('keydown', e => e.key === 'Tab' && e.preventDefault());

loadQuestion();
