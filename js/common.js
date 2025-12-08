const target = document.getElementById("site-title");

// ===== UTIL =====
/**
 * 遅延
 * @param {*} ms 
 * @returns 
 */
function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * ランダム遅延
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function randomDelay(min = 60, max = 150) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 残像演出
 */
const afterImage = () => {
  const ghost = target.cloneNode(true); // タイトルのコピー
  ghost.classList.add("afterimage");   // CSSで赤い残像になる
  document.body.appendChild(ghost);

  setTimeout(() => ghost.remove(), 300); // 0.3秒で消える
};

/**
 * グリッチ演出
 */
const glitch = () => {
  target.setAttribute("data-text", target.textContent);
  target.classList.add("glitch");
  setTimeout(() => target.classList.remove("glitch"), 300); // 0.3秒だけ
};

/**
 * ランダムでグリッチを発生させる
 */
function startRandomGlitch() {
  const randomTime = Math.floor(Math.random() * 3000) + 1500;
  // → 1.5〜4.5秒に一度 glitch が発生

  setTimeout(() => {
    glitch();
    startRandomGlitch(); // 再帰でループ
  }, randomTime);
}
