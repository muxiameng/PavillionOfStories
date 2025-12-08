// ===== CONFIG =====
const eng = ["comics"];

// ===== MAIN =====
async function typeText() {

  // 1. 英字タイピング
  for (let char of eng[i].split('')) {
    target.textContent += char;
    await delay(randomDelay());
    await delay(300);
  }

  // 震え
  target.classList.add("shake");
  await delay(250);
  target.classList.remove("shake");

  afterImage();
  glitch();

  startRandomGlitch();

}

document.addEventListener("DOMContentLoaded", typeText);

