/// public/script.js
const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "JavaScript is fun to learn and powerful to use",
  "Node.js runs JavaScript on the server",
  "Typing fast requires focus and practice",
  "Speed and accuracy are both important in typing",
  "Consistency in typing improves muscle memory",
  "The more you practice the better you get",
  "Typing games are great for improving keyboard skills"
];

let sentenceIndex = 0;
let currentSentence = "";
let startTime;
let timerInterval;
let timeLeft = 30;

const sentenceDisplay = document.getElementById("sentence");
const input = document.getElementById("input");
const timer = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const keySound = document.getElementById("keySound");

function loadSentence() {
  currentSentence = sentences[sentenceIndex % sentences.length];
  sentenceDisplay.textContent = currentSentence;
  input.value = "";
  timeLeft = 30;
  timer.textContent = timeLeft;
  startTime = null;
  clearInterval(timerInterval);
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "100%";
  input.disabled = false;
  input.focus();
}

function startGame() {
  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        input.disabled = true;
        setTimeout(nextLevel, 1000);
      }
    }, 1000);
  }

  const typed = input.value;
  if (typed.length > 0) {
    keySound.currentTime = 0;
    keySound.play();
  }

  const correctChars = [...typed].filter((char, i) => char === currentSentence[i]).length;
  const wpm = Math.round((typed.length / 5) / ((30 - timeLeft + 1) / 60));
  const accuracy = Math.round((correctChars / typed.length) * 100) || 100;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy + "%";

  if (typed === currentSentence) {
    clearInterval(timerInterval);
    input.disabled = true;
    setTimeout(nextLevel, 1000);
  }
}

function nextLevel() {
  sentenceIndex++;
  loadSentence();
}

function restartGame() {
  sentenceIndex = 0;
  loadSentence();
}

input.addEventListener("input", startGame);

window.onload = () => {
  loadSentence();
};
