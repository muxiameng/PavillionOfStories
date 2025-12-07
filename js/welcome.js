// ===== CONFIG =====
const romaji = "touennrou";
const hira = "とうえんろう";
const kanji = "灯縁楼";

// ===== UTIL =====
function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function randomDelay(min = 60, max = 150) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAfterimage(target, text) {
  const clone = document.createElement("span");
  clone.textContent = text;
  clone.classList.add("afterimage");
  target.parentNode.appendChild(clone);

  setTimeout(() => clone.remove(), 400);
}

// ===== MAIN =====
async function typeThreeStage() {
  const target = document.getElementById("site-title");

  // 1. ローマ字タイピング
  for (let char of romaji) {
    target.textContent += char;
    await delay(randomDelay());
  }
  await delay(300);

  // 2. ひらがなに変換
  createAfterimage(target, target.textContent);
  target.textContent = "";

  for (let char of hira) {
    target.textContent += char;
    await delay(randomDelay(50, 130));
  }
  await delay(300);

  // 3. 漢字へ変換（震え・残像・風ゆらぎ）
  createAfterimage(target, target.textContent);
  target.textContent = kanji;

  // 震え
  target.classList.add("shake");
  await delay(250);
  target.classList.remove("shake");

  // 風のゆらぎ
  target.classList.add("wind");
  await delay(800);
  target.classList.remove("wind");
}

document.addEventListener("DOMContentLoaded", typeThreeStage);