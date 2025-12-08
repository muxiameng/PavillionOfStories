// ===== CONFIG =====
const romaji = ["tou","enn","rou"];
const hira = ["とう","えん","ろう"];
const kanji = ["灯","縁","楼"];

// ===== MAIN =====
async function typeThreeStage() {

  for (let i = 0; i < romaji.length; i++) {
    // 1. ローマ字タイピング
    for (let char of romaji[i].split('')) {
      target.textContent += char;
      await delay(randomDelay());
    }
    await delay(300);

    // 2. ひらがなに変換
    target.textContent = target.textContent.slice(0, -romaji[i].length);
    target.textContent += hira[i];
    await delay(randomDelay(50, 130));
    await delay(300);

    // 3. 漢字へ変換（震え・残像・風ゆらぎ）
    target.textContent = target.textContent.slice(0, -hira[i].length);
    target.textContent += kanji[i];
  }

  // 震え
  target.classList.add("shake");
  await delay(250);
  target.classList.remove("shake");

  afterImage();
  glitch();

  startRandomGlitch();

}

document.addEventListener("DOMContentLoaded", typeThreeStage);

